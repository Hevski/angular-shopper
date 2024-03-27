import { UserService } from './../users/user.service';
import { ProductService } from './../products/product.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  basket: any;
  productsInBasket$!: Observable<any[]>;
  total$!: Observable<number>;
  productQuantities = {} as any;
  userId!: number;

  /**
   * Injects dependencies
   * @param basketService
   * @param productService
   * @param userService
   */
  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private userService: UserService
  ) {
    // TODO - need to figure out why this isn't working and can i reasign it when a user adds an item to the backet.
    // Basket not showing on first load even though there are items
    this.productsInBasket$ = this.getBasketForUser();
    this.productsInBasket$.subscribe((res) => {
      console.log(res);
    });
  }

  /**
   * Initialises the component
   */
  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.getBasketForUser();
    this.getProductsInBasket();
  }

  /**
   * Get baksets for a specific user id
   */
  getBasketForUser(): Observable<any[]> {
    // Hardcoded user id - Would get this from the logged in user in an auth service using cookies, session storage or a user details resolver.
    return this.basketService.getBasketForUser(this.userId).pipe(
      switchMap((basket) => {
        this.getProductsInBasket();
        return of(basket); // Return the basket for further processing if needed
      })
    );
  }

  /**
   * Get products in a basket
   */
  getProductsInBasket(): any {
    this.productsInBasket$ = this.basketService.items$.pipe(
      switchMap((items) =>
        forkJoin(
          items.map((item) => this.productService.getProductById(item.id))
        )
      )
    );
    this.total$ = this.calculateTotal();
  }

  /**
   * Sets the product quantities as a lookup
   * @param product
   */
  setProductQuantities(product: any): void {
    //TODO - Need to set these productQuantities somewhere
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
}
