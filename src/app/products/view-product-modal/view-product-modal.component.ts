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

  constructor(
    private basketService: BasketService,
    private modalService: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  addItemToBasket(): void {
    this.basketService.addItemToBasket(1, {id: 1, quantity: 1}).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  close(): void {
    this.modalService.dismiss();
  }

}
