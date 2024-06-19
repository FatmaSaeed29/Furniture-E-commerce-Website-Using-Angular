import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //* make dependence injection to call what i want
  constructor(private httpClient: HttpClient) { }

 
  //? Get All Products
  getAllProducts(){
    return this.httpClient.get('https://localhost:44374/api/product')
  }

  //? get all categories
  getAllCategories(){
    return this.httpClient.get('https://localhost:44374/api/category');
  }

  //? get product per category
  getProductPerCategory(keyword:string){
    return this.httpClient.get('https://localhost:44374/api/product/'+keyword);
  }

  //? get product by id
  getProductById(id:any){
    return this.httpClient.get('https://localhost:44374/api/product/' + id);
  }
}
