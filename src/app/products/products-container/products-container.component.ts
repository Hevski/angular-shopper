import { ViewProductModalComponent } from './../view-product-modal/view-product-modal.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {PageEvent} from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  products: any;
  searchTerm = ''

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getproducts();
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

}
