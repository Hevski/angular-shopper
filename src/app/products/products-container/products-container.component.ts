import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  products: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts(): void {
    this.productService.getProducts(12).subscribe(
      (products => {
        this.products = products;
        console.log(this.products);
      })
    )
  }

}
