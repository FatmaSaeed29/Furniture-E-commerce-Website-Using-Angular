import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../Service/order.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../Components/Shared/spinner/spinner.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [RouterLink,CommonModule,SpinnerComponent,MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent implements OnInit{
  
  orderId:number;
  orderItems:any;
  loading:boolean=true;
  
  displayedColumns: string[] = ['id','productId', 'productName','orderId','quantity','price'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private route:ActivatedRoute, private service:OrderService) {
    this.orderId=Number(route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.getOrderItems(this.orderId);
  }

  getOrderItems(id:number){
    this.service.getOrderItems(id).subscribe((res:any)=>{
      this.orderItems =res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(this.orderItems);
      console.log(this.dataSource);
      

      this.loading=false;
    },(error)=>{
      alert("error")
    });
  }






allOrders(){
  this.service.getAllOrders().subscribe((res:any)=>{
    this.orderItems=res as any[];
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.loading=false;
  },(error)=>{
    alert("Error!! can't get data")
  })
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }    
}
}
