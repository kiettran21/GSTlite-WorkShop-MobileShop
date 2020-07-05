import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public userName = 'admin';
  public password = 'admin';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login = () => {
    this.authenticationService.login(this.userName, this.password).subscribe(
      (data) => {
        if (data != null && data.username) {
          localStorage.setItem('username', data.username);
          localStorage.setItem('password', data.password);
          console.log('Login Success');
          //this.router.navigateByUrl('/productlist');
        }
        else {
          console.log('Login fail');
        }
      },
      (error) => console.error(error)
    )
  }

}
