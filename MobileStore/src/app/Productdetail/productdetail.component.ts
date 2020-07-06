import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from './productdetail.service';
import { Product } from '../models/Product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  public product: Product

  constructor(private  service: ProductDetailService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
   this.getProductDetail();
   console.log(this.product)
  }

  public getProductDetail = async () => {
    //Tạm 5 nha do ko rõ chưa biết bắt routing
    try {
      const id = this.actRoute.snapshot.params['id'];
      const result = await this.service.getProductdetail(id);
      this.product = result as Product;
      console.log(this.product);
    }
   catch (error) {
     console.log(error);
   }
  }
}
