import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './../Service/products.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../Shared/spinner/spinner.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../models/IProduct';
import { ICartType } from '../../../models/ICartType';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [HttpClientModule , CommonModule , SpinnerComponent, ProductItemComponent , RouterLink],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit{
  products:any[] =[];
  categories:any[] =[];
  cartProducts :any[] = [];
  //* variable for check if there are data hide the spinner and vice versa it is hided by default
  loading : boolean = false; 
  // data!:IProduct;
  // cartProduct:ICartType[]=[]   
  // itemWithQuant!:ICartType
  // iconAdded:boolean=false;
  constructor(private service:ProductsService ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    //* first time calling thus method -> make the spinner true to make it show until the data is loaded
    this.loading = true;

    //*make observable here and use a function in it which is subscribe
    this.service.getAllProducts().subscribe((res:any) => {
      //* res is the all products in api
      this.products = res;
      // console.log(res);
      
      //* data is already here is loaded so hide the spinner
      this.loading = false;

      console.log(res);
    } , error => {
      this.loading = false;
      alert(error.message)
    })
  }

  getCategories(){
    //* the same for spinner in categories
    this.loading = true;

    this.service.getAllCategories().subscribe({
      next: (data:any) => {
        console.log(data)
        this.loading = false
        this.categories = data
      } , 
      error: (error) => {
        // console.log(error.message)
        this.loading = false;
        alert(error.message)
      }
    })
  }

  filterCategory(event:any){
    let value = event.target.value;
    console.log(value)
    if(value == "all"){
      this.getProducts()
    }else{
      this.getProductsCategory(value);
    }
  }

  getProductsCategory(keyword : string){
    this.loading = true;
    this.service.getProductPerCategory(keyword).subscribe((res:any) => {
      this.loading = false;
      this.products = res
    })
  }



  //? add to cart
  // addToCart(event:any){
  //   console.log(event)
  //   //* when click on any item save it in the local storage just like it is - the same data -> JSON.stringify (when send data)
  //   //* when receive data return it just the way it is in cart -> JSON.parse

  //   //* this will make an item in local Storage called cart and but the products in it
  //   if("cart" in localStorage){
  //     this.cartProducts = JSON.parse(localStorage.getItem("cart")!) // ! to skip the null
  //     //* to search in cart items to not add the same product twice
  //     let exist = this.cartProducts.find(item => item.id == event.id)
  //     if(exist){
  //       alert('product is already in your cart')
  //     }else{
  //       this.cartProducts.push(event);
  //       localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  //     }
  //   }
  //   else{
  //     this.cartProducts.push(event);
  //     localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  //   }

  // }
}

