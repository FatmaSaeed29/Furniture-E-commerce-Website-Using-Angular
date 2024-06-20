import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Service/order.service';
import { IOrder } from '../../../models/IOrder';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../Components/Shared/spinner/spinner.component';

@Component({
  selector: 'app-display-orders',
  standalone: true,
  imports: [CommonModule,RouterLink,SpinnerComponent],
  templateUrl: './display-orders.component.html',
  styleUrl: './display-orders.component.css'
})
export class DisplayOrdersComponent implements OnInit{

  orders:IOrder[]=[];
  loading:boolean=true;

  constructor(private service:OrderService) {
  }
  ngOnInit(): void {
    this.allOrders();
  }

  allOrders(){
    this.service.getAllOrders().subscribe((res)=>{
      this.orders=res as IOrder[];
      console.log(res);
      
      this.loading=false;
    },(error)=>{
      alert("Error!! can't get data")
    })
  }

}
