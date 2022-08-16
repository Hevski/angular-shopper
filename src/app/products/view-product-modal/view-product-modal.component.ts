import { UserService } from './../../users/user.service';
import { SnackbarService } from './../../Utils/snackbar.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from './../../basket/basket.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product-modal',
  templateUrl: './view-product-modal.component.html',
  styleUrls: ['./view-product-modal.component.css']
})
export class ViewProductModalComponent implements OnInit {
  @Input() title!: string
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
  ) { }

  /**
   * Initialises the component
   */
  ngOnInit(): void {
    this.userId = this.userService.getUserId();
  }

  /**
   * Updates a users basket
   */
  updateUserBasket(product: any): void {
    let productsInBasket = [] as any;
    this.basketService.getBasketForUser(this.userId).subscribe(
      (basket => {
        productsInBasket = basket.products;
        const basketProduct = {
          id: product.id,
          quantity: 1
        }
        const existingProduct = productsInBasket.find((product: any) => product.id === basketProduct.id);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          productsInBasket.push(basketProduct);
        }
        this.addProductToBasket(productsInBasket);
      })
    )
  }

  /**
   * Adds product to basket
   * @param productsInBasket
   */
  addProductToBasket(productsInBasket: any): void {
    this.basketService.addProductToBasket(this.userId, productsInBasket).subscribe(
      (res) => {
        this.snackbar.onSuccess(
          'Product added to basket',
          'success-snackbar'
        );
        this.close();
        window.location.reload();
      }
    )
  }

  

  /**
   * Close the modal
   */
  close(): void {
    this.modalService.dismiss();
  }

}
