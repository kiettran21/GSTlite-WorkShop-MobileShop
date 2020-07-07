import { Component, OnInit } from '@angular/core';

import { ProductlistServices } from './productlist.service'
import { Product } from '../models/Product'
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  private services = new ProductlistServices();
  public productList = new Array<Product>();
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList = async () => {
    const list = await this.services.getProductList();

    for (let i = 0; i < list.length; i++) {
      let product = new Product();
      product.id = list[i].id;
      product.name = list[i].name;
      product.category = list[i].category;
      product.conditionProduct = list[i].conditionProduct;
      product.description = list[i].description;
      product.imageUrl = list[i].imageUrl;
      product.manufacturer = list[i].manufacturer;
      product.price = list[i].price;
      product.quantity = list[i].quantity;

      this.productList.push(product);
    }
  }

  public getNavigation(link, id) {
    if (id === '') {
      this.router.navigate([link]);
    }
    else {
      this.router.navigate([link + '/' + id]);
    }
  }
}
