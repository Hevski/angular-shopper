import { SnackbarService } from '../../Utils/snackbar.service';
import { ProductService } from '../product.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.css'],
})
export class AddEditProductModalComponent implements OnInit {
  @Input() title!: string;
  @Input() product: any;
  @Input() isEdit: boolean = false;
  editProductForm!: FormGroup;
  addProductForm!: FormGroup;
  new = {
    defaultImage: 'http://placeimg.com/640/480/cats',
    images: [
      'http://placeimg.com/640/480/cats',
      'http://placeimg.com/640/480/cats',
      'http://placeimg.com/640/480/cats',
      'http://placeimg.com/640/480/cats',
    ],
  };

  /**
   * Injects dependencies
   * @param modalService
   * @param productService
   * @param snackbar
   */
  constructor(
    private modalService: NgbActiveModal,
    private productService: ProductService,
    private snackbar: SnackbarService
  ) {}

  /**
   * Initialises the component
   */
  ngOnInit(): void {
    if (this.isEdit) {
      this.initEditForm();
    } else {
      this.initAddProductForm();
    }
  }

  /**
   * Initialise the edit form
   */
  initEditForm(): any {
    this.editProductForm = new FormGroup({
      name: new FormControl(this.product.name),
      description: new FormControl(this.product.description),
      price: new FormControl(this.product.price),
    });
  }

  /**
   * Initialises add new product form
   */
  initAddProductForm(): any {
    this.addProductForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      defaultImage: new FormControl(this.new.defaultImage),
      images: new FormControl(this.new.images),
      price: new FormControl(),
      discount: new FormControl(),
    });
  }

  /**
   * Update product
   */
  updateProduct(): void {
    const productForm = this.editProductForm.getRawValue();
    this.productService
      .updateProduct(this.product.id, productForm)
      .subscribe((product) => {
        this.snackbar.onSuccess('Product updated', 'success-snackbar');
        this.close();
      });
  }

  /**
   * Adds a new product to the product list
   */
  addProduct(): void {
    const product = this.addProductForm.getRawValue();
    this.productService.addProduct(product).subscribe((product) => {
      this.snackbar.onSuccess('Product added', 'success-snackbar');
      this.close();
    });
  }

  /**
   * Close the modal
   */
  close(): void {
    this.modalService.dismiss();
  }
}
