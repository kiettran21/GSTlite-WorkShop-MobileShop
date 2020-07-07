import { Component, OnInit, Input, Output } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() subtitle = '';
  @Input() button = '';
  @Input() cart = '';
  @Input() role = '';

  public numberOfProductsInCart = 0;
  
  public productsCart = []

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoad();
    this.numberOfProductsInCart = parseInt(localStorage.getItem('numberOfProductsInCart')) || 0;
    this.productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
  }

  public initLoad = () => {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser)
    if (currentUser) {
      //Nếu admin chỉ xuất hiện add product, logout
      this.button = 'logout';
      if (currentUser.role === 'admin') {
        this.role = 'admin';
        this.cart = '';
      }
      else {
        this.role = 'customer';
        this.cart = 'view-cart';
      }
    }
    else {
      this.button = 'login';
      this.cart = 'view-cart';
    }
  }

  public onLogout = () => {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

  public onLogin = () => {
    this.router.navigate(['/login']);
  }

  public onProductList = () => {
    this.router.navigate(['/addproduct']);
  }

  public updateCart(product, quantity = 0) {
    if (!this.productsCart.some(el => el.id === product.id)) {
      this.numberOfProductsInCart += 1;
      this.productsCart.push(product);
      localStorage.setItem('numberOfProductsInCart', this.numberOfProductsInCart.toString());
    }

    let quantityInSession = parseInt(localStorage.getItem(product.id.toString())) || 0;
    quantityInSession += quantity;
    
    localStorage.setItem(product.id.toString(), quantityInSession.toString());
    localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
  }

  public checkoutCart() {
    this.numberOfProductsInCart =  0;
    this.productsCart = [];

    localStorage.setItem('numberOfProductsInCart', this.numberOfProductsInCart.toString());
    localStorage.setItem('productsCart', JSON.stringify(this.productsCart));

    this.router.navigateByUrl('/');
  }
}
