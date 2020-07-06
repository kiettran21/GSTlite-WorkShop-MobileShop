import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public orderedProducts = new Array<Product>();
  //public quantityOfProducts = []

  constructor() { }

  ngOnInit(): void {
   this.init();
  }

  public init() {
    this.orderedProducts = JSON.parse(localStorage.getItem('productsCart'));
    
    // for (let i = 0; i < this.orderedProducts.length; i++) {
    //   this.quantityOfProducts.push({ 'quantity': this.getQuantity(this.orderedProducts[i].id)});
    // }

    // console.log(this.quantityOfProducts);
  }

  public addProductToCart(product){

  }

  public getQuantity(id) {
    return parseInt(localStorage.getItem(id.toString()));
  }
}
