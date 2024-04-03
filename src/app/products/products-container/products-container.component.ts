import { AddEditProductModalComponent } from './../add-edit-product-modal/add-edit-product-modal.component';
import { SnackbarService } from './../../Utils/snackbar.service';
import { ViewProductModalComponent } from './../view-product-modal/view-product-modal.component';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/ui-components/modal/modal.component';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { MessageServiceService } from 'src/app/message-service.service';

export interface Product {
  defaultImage: string;
  name: string;
  price: number;
  id: number;
}

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css'],
})
export class ProductsContainerComponent {
  products$!: Observable<Product[]>;
  searchTerm = '';
  isAdmin: boolean = false;
  private productService = inject(ProductService);
  private modalService = inject(NgbModal);
  private snackbar = inject(SnackbarService);
  private readonly messageService = inject(MessageServiceService);

  constructor() {
    this.getproducts();
  }

  initAdmin(): void {
    this.isAdmin = !this.isAdmin;
  }

  addMessage(newMessage: string): void {
    const currentMessage = this.messageService.messagesSource.value;
    const updatedMessages = [...currentMessage, newMessage];
    this.messageService.messagesSource.next(updatedMessages);
  }

  /**
   * Gets available products
   */
  getproducts(): void {
    this.products$ = this.productService
      .getProducts(12, this.searchTerm)
      .pipe(take(1));
  }

  /**
   * Opens the view product modal
   */
  openProductModal(product: any): void {
    const modalRef = this.modalService.open(ViewProductModalComponent, {
      backdrop: 'static',
      windowClass: 'large-width',
      keyboard: false,
    });
    modalRef.componentInstance.title = product.name;
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.customFooter = true;
    modalRef.result.then(
      (confirmed) => {},
      (dismissed) => {}
    );
  }

  /**
   * Callback function that gets passed to search component
   * @param searchTerm
   */
  handleSearchCallBack = (searchTerm: string): void => {
    this.searchTerm = searchTerm;
    this.getproducts();
  };

  /**
   * Opens the delete product modal
   * @param productId
   */
  openDeleteProductModal(productId: number): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      windowClass: 'large-width',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete product';
    modalRef.componentInstance.body =
      'Are you sure you want to delete this product?';
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
    this.productService.deleteProduct(productId).subscribe((res) => {
      this.snackbar.onSuccess('Product deleted', 'success-snackbar');
    });
    this.getproducts();
    this.isAdmin = false;
  }

  /**
   * Opens the edit product modal
   */
  openEditProductModal(product: any): void {
    const modalRef = this.modalService.open(AddEditProductModalComponent, {
      backdrop: 'static',
      windowClass: 'large-width',
      keyboard: false,
    });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.title = 'Edit product';
    modalRef.componentInstance.customFooter = true;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(
      (confirmed) => {
        this.getproducts();
      },
      (dismissed) => {
        this.getproducts();
      }
    );
  }

  /**
   * Opens the add new product modal
   */
  openAddNewProductModal(): void {
    const modalRef = this.modalService.open(AddEditProductModalComponent, {
      backdrop: 'static',
      windowClass: 'large-width',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Add new product';
    modalRef.componentInstance.customFooter = true;
    modalRef.result.then(
      (confirmed) => {
        this.getproducts();
      },
      (dismissed) => {
        this.getproducts();
      }
    );
  }
}
