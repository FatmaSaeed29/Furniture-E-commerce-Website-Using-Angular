import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../../models/IProduct';

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

  /////

getProductsByCategory(categoryid:number){
    return this.httpClient.get('https://localhost:44374/api/Products/Category/'+categoryid);  //***         ../api/Products/Category/id        ***/
}

getProduct(productId:number){
  return this.httpClient.get('https://localhost:44374/api/Product/'+productId);
}

addProduct(product:IProduct){
  return this.httpClient.post('https://localhost:44374/api/Product',product);
}
editProduct(id:number,product:IProduct){
  return this.httpClient.put('https://localhost:44374/api/Product/'+id,product);
}

deleteProduct(id:number){
  return this.httpClient.delete('https://localhost:44374/api/Product/'+id);
}
}
