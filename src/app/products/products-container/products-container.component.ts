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
    this.productService.getProducts(12).subscribe(
      (products => {
        this.products = products;
        console.log(this.products);
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
      // add to basket
    },
    (dismissed) => {
      // Something else
    }
   )
  }

}
