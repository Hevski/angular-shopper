import { UserService } from './../users/user.service';
import { ProductService } from './../products/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import {
  Observable,
  Subject,
  filter,
  forkJoin,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  productsInBasket$!: Observable<any>;
  total$!: Observable<number>;
  productQuantities = {} as any;
  userId!: number;

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.userId = this.userService.getUserId();
  }

  ngOnInit(): void {
    this.getBasketForUser();
    // TODO: need a better way of doing this
    this.basketService.items$
      .pipe(
        takeUntil(this.unsubscribe),
        filter((res) => res.length > 0),
        tap(() => this.getProductsInBasket())
      )
      .subscribe();
  }

  getBasketForUser() {
    this.productsInBasket$ = this.basketService
      .getBasketForUser(this.userId)
      .pipe(
        switchMap((basket) => {
          if (!basket.products || basket.products.length === 0) {
            return of([]);
          }

          return forkJoin(
            basket.products.map((product: any) => {
              this.setProductQuantities(product);

              return this.productService.getProductById(product.id).pipe(
                map((productDetails) => {
                  return productDetails;
                })
              );
            })
          );
        })
      );
  }

  getProductsInBasket(): void {
    this.productsInBasket$ = this.basketService.items$.pipe(
      switchMap((items) => {
        const itemsWithQuantitiesSet = items.map((item) => {
          this.setProductQuantities(item);
          return item;
        });
        return forkJoin(
          itemsWithQuantitiesSet.map((item) =>
            this.productService.getProductById(item.id)
          )
        );
      })
    );
    this.total$ = this.calculateTotal();
  }

  setProductQuantities(product: any): void {
    this.productQuantities[product.id] = product.quantity;
  }

  calculateTotal(): Observable<number> {
    return this.productsInBasket$.pipe(
      map((products) => {
        let total = 0;
        products.forEach((product: any) => {
          const quantity = this.productQuantities[product.id] || 0;
          total += product.price * quantity;
        });
        return total;
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
