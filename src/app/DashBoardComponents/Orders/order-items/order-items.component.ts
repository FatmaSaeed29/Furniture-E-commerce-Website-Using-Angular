import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../Service/order.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../Components/Shared/spinner/spinner.component';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [RouterLink,CommonModule,SpinnerComponent],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent implements OnInit{

  orderId:number;
  orderItems:any;
  loading:boolean=true;

  constructor(private route:ActivatedRoute, private service:OrderService) {
    this.orderId=Number(route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.getOrderItems(this.orderId);
  }

  getOrderItems(id:number){
    this.service.getOrderItems(id).subscribe((res)=>{
      this.orderItems =res;
      this.loading=false;
    },(error)=>{
      alert("error")
    });
  }
}
