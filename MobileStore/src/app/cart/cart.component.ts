import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public orderedProducts = new Array<Product>();

  constructor() { }

  ngOnInit(): void {
    this.orderedProducts = JSON.parse(localStorage.getItem('productsCart'));
  }

  public addProductToCart(product){

  }
}
