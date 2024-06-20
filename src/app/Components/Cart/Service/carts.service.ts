import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../../../models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  checkout(cartData:IOrder){
    console.log(cartData);
    
    return this.http.post("https://localhost:44374/api/Order",cartData)
  }
}
