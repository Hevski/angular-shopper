import { UserService } from './../users/user.service';
import { ProductService } from './../products/product.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket: any;
  productsInBasket = [] as any;
  total = 0;
  productQuantities = {} as any;
  userId!: number;

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.getBasketForUser();
  }

  /**
   * Get baksets for a specific user id
   */
  getBasketForUser(): void {
    // Hardcoded user id - Would get this from the logged in user in an auth service using cookies, session storage or a user details resolver.
    this.basketService.getBasketForUser(this.userId).subscribe(
      (basket) => {
        this.basket = basket;
        this.getProductsInBasket();
      }
    )
  }

  /**
   * Get products in a basket
   */
  getProductsInBasket(): any {
    this.basket.products.forEach((item: any) => {
      this.productQuantities[item.id] = item.quantity;
      this.getProductById(item.id);
    });
  }

  /**
   * Get product by id
   * @param productId 
   */
  getProductById(productId: number): any {
    this.productService.getProductById(productId).subscribe(
      (product => {
        this.productsInBasket.push(product);
        this.calculateTotal();
      })
    )
  }

  /**
   * Calculate the baskets total
   */
  calculateTotal(): any {
    this.productsInBasket.forEach((item: any) => {
      this.total += item.price;
    })
  }


}
