import { EditProductModalComponent } from './../edit-product-modal/edit-product-modal.component';
import { SnackbarService } from './../../Utils/snackbar.service';
import { ViewProductModalComponent } from './../view-product-modal/view-product-modal.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/ui-components/modal/modal.component';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  products: any;
  searchTerm = ''
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getproducts();
  }

  /**
   * Initiates admin functionality
   */
  initAdmin(): void {
    this.isAdmin = !this.isAdmin;
  }

  /**
   * Gets available products
   */
  getproducts(): void {
    this.productService.getProducts(12, this.searchTerm).subscribe(
      (products => {
        this.products = products;
      })
    )
  }

  /**
   * Opens the view product modal
   */
  openProductModal(product: any): void {
    const modalRef = this.modalService.open(ViewProductModalComponent, {
      backdrop: 'static',
      windowClass: 'large-width'
    });
    modalRef.componentInstance.title = product.name;
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.confirmButtonText = 'Add item';
    modalRef.componentInstance.customFooter = true;
    modalRef.result.then(
      (confirmed) => {
        this.getproducts();
      },
      (dismissed) => {
        this.getproducts();
      }
    )
  }

  /**
   * Callback function that gets passed to search component
   * @param searchTerm
   */
  handleSearchCallBack = (searchTerm: string): void => {
    this.searchTerm = searchTerm;
    this.getproducts();
  };

  openDeleteProductModal(productId: number): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.title = 'Delete product';
    modalRef.componentInstance.body = 'Are you sure you want to delete this product?';
    modalRef.componentInstance.confirmButtonText = 'Delete';
    modalRef.result.then(
      (confirmed) => {
        this.deleteProduct(productId);
      },
      (dismissed) => {
        this.getproducts();
      }
    );
  }

  /**
   * Deletes a product
   * @param product
   */
  deleteProduct(productId: any): void {
    this.productService.deleteProduct(productId).subscribe(
      (res) => {
        this.snackbar.onSuccess(
          'Product deleted',
          'success-snackbar'
        );
      }
    );
    this.getproducts();
    this.isAdmin = false;
    // TODO: this.getProducts() should reload the products but not working everytime - reloading window instead (wouldn't do this in the real world!)
    window.location.reload();
  }

  /**
   * Opens the edit product modal
   */
  openEditProductModal(product: any): void {
    const modalRef = this.modalService.open(EditProductModalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.title = 'Edit product';
    modalRef.componentInstance.confirmButtonText = 'Add item';
    modalRef.componentInstance.customFooter = true;
    modalRef.result.then(
      (confirmed) => {
        this.getproducts();
      },
      (dismissed) => {
        this.getproducts()
      }
    );
  }

}
