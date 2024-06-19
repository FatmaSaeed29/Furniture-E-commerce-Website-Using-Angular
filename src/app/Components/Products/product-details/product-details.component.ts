import { ProductsService } from './../Service/products.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from './../../../app.routes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  id : any;
  data:any={};

  //* to hold an id from the route we should use activated route
  constructor(private route: ActivatedRoute , private service:ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.service.getProductById(this.id).subscribe(res => {
      this.data = res
    })
  }
}
