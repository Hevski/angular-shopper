import { SnackbarService } from './../../Utils/snackbar.service';
import { ProductService } from './../product.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {
  @Input() title!: string
  @Input() product: any;
  editProductForm!: FormGroup;

  constructor(
    private modalService: NgbActiveModal,
    private productService: ProductService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    console.log(this.product);
    this.initEditForm()
  }

  /**
   * Initialise the edit form
   */
  initEditForm(): any {
    this.editProductForm = new FormGroup({
      name: new FormControl(this.product.name),
      description: new FormControl(this.product.description),
      price: new FormControl(this.product.price)
    })
  }

  /**
   * Update product
   */
  updateProduct(): void {
    const productForm = this.editProductForm.getRawValue();
    this.productService.updateProduct(this.product.id, productForm).subscribe(
      (product => {
        console.log(product);
        this.snackbar.onSuccess(
          'Product updated',
          'success-snackbar'
        );
      })
    )
  }

  /**
 * Close the modal
 */
  close(): void {
    this.modalService.dismiss();
  }

}
