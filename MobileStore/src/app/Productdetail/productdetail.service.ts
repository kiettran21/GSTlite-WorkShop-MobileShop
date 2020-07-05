import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductDetailService {
  private urlAPI = 'http://localhost:8080';

  constructor( private http: HttpClient) { }

  public getProductdetail = async (id) => {
    try {
        const loginUrl = `${this.urlAPI}/api/v1/product/get/${id}`;
        return await this.http.get(loginUrl).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }
}
