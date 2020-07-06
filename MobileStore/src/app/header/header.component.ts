import { Component, OnInit, Input } from '@angular/core';

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

  public numberOfProductsInCart=0;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoad();
    this.numberOfProductsInCart=this.numberOfProductsInCart;
    
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

  
}
