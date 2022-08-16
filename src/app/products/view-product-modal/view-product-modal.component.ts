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

  constructor(
    private basketService: BasketService,
    private modalService: NgbActiveModal,
    private snackbar: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
  }

  /**
   * Adds item to a users basket
   */
  addItemToBasket(product: any): void {
    const payload = {
      id: product.id,
      quantity: 1
    }
    this.basketService.addItemToBasket(this.userId, payload).subscribe(
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
