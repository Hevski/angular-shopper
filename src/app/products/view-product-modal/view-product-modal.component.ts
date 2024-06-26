import { UserService } from './../../users/user.service';
import { SnackbarService } from './../../Utils/snackbar.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from './../../basket/basket.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product-modal',
  templateUrl: './view-product-modal.component.html',
  styleUrls: ['./view-product-modal.component.css'],
})
export class ViewProductModalComponent implements OnInit {
  readonly productService = inject(ProductService);
  @Input() title!: string;
  @Input() product: any;
  userId!: number;
  private readonly basketService = inject(BasketService);
  private readonly snackbar = inject(SnackbarService);
  private readonly userService = inject(UserService);
  private readonly modalService = inject(NgbActiveModal);

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
  }

  updateUserBasket(product: any): void {
    this.basketService
      .getBasketForUser(this.userId)
      .pipe(
        map((basket) => {
          const productsInBasket = [...basket.products]; // Copying basket products
          const basketProduct = {
            id: product.id,
            quantity: 1,
          };
          const existingProductIndex = productsInBasket.findIndex(
            (p: any) => p.id === basketProduct.id
          );
          if (existingProductIndex !== -1) {
            productsInBasket[existingProductIndex].quantity += 1;
          } else {
            productsInBasket.push(basketProduct);
          }
          return productsInBasket;
        }),
        switchMap(async (updatedBasket) =>
          this.addProductToBasket(updatedBasket)
        )
      )
      .subscribe();
  }

  addProductToBasket(productsInBasket: any): void {
    this.basketService
      .addProductToBasket(this.userId, productsInBasket)
      .pipe(
        tap(() => {
          this.snackbar.onSuccess(
            'Product added to basket',
            'success-snackbar'
          );
          this.close();
          this.basketService._itemsSource.next(productsInBasket);
        })
      )
      .subscribe();
  }

  close(): void {
    this.modalService.dismiss();
  }
}
