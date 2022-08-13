import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {
  @Input() title!: string
  @Input() product: any;

  constructor(
    private modalService: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  updateItem(): void {
    console.log('updated', this.product);
  }

  /**
 * Close the modal
 */
  close(): void {
    this.modalService.dismiss();
  }

}
