import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private urlAPI = 'http://localhost:8080';

  constructor( private http: HttpClient) { }

  public addProduct = async (product: Product) => {
    try {
        const loginUrl = `${this.urlAPI}/api/v1/product/add`;
        return await this.http.post(loginUrl, product).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }
}
