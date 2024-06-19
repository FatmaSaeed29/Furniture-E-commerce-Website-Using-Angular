import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../../../models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  checkout(cartData:IOrder){
    return this.http.post("https://localhost:44371/api/Order",cartData)
  }
}
