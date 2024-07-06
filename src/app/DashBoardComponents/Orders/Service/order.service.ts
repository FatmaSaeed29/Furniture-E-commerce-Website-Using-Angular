import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getAllOrders(){
    return this.http.get("https://localhost:44374/api/Order");
  }

  getOrderItems(orderId:number){
    return this.http.get("https://localhost:44374/api/OrderItem/"+orderId);
  }
  private urlApi = "http://localhost:5277/api/Category";
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoiZmFsc2UiLCJleHAiOjE3MTYwNjE4MDd9.SPNN6XnwfigEIiRnbeheJrXpssgn-uKmGqWqsq86dpY'; 

//   featchData():Observable<any>{
//     const headers = new HttpHeaders({
//       'Authorization': Bearer ${this.authToken}
//     });
//     return this.http.get<any>(this.urlApi, { headers: headers });
//   }
}
