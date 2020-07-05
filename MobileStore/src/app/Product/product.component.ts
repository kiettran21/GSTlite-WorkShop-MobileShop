import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public name: String;
  public imageUrl: String;
  public price: Number;
  public description: String;
  public manufacturer: String;
  public category: String;
  public conditionProduct: String;
  public quantity: String;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  public createProduct = async () => {
    try {
      let product = new Product();
      product.name = this.name;
      product.category = this.category;
      product.conditionProduct = this.conditionProduct;
      product.description = this.description;
      product.imageUrl = this.imageUrl;
      product.manufacturer = this.manufacturer;
      product.price = this.price;
      product.quantity = this.quantity;

      console.log("Test.....");

      const result = await this.productService.addProduct(product);

      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
  }

}
