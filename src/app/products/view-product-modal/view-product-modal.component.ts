import { UserService } from './../../users/user.service';
import { SnackbarService } from './../../Utils/snackbar.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from './../../basket/basket.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Subject, map, switchMap, tap } from 'rxjs';
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

  /**
   * Injects dependencies
   * @param basketService
   * @param modalService
   * @param snackbar
   * @param userService
   */
  constructor(
    private basketService: BasketService,
    private modalService: NgbActiveModal,
    private snackbar: SnackbarService,
    private userService: UserService
  ) {}

  /**
   * Initialises the component
   */
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

  /**
   * Adds product to basket
   * @param productsInBasket
   */
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
          this.productService.notifyBasketUpdate(); //Need to work out why this is not updating the basket until page reload.
        })
      )
      .subscribe();
  }

  /**
   * Close the modal
   */
  close(): void {
    this.modalService.dismiss();
  }
}
