import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../models/Product';
import { AuthenticationService } from '../login/authentication.service';
import { Router } from '@angular/router';

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
  public image: String;

  constructor(private productService: ProductService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkRole();
  }

  public checkRole = () => {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser)
    if (currentUser) {
      if (currentUser.role === 'admin') return;
    }
   
    this.router.navigateByUrl('/');
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

      const result = await this.productService.addProduct(product);

      console.log(result);
      alert("Thêm thành công");
      this.router.navigateByUrl('/')

    }
    catch (error) {
      console.log(error);
    }
  }

}
