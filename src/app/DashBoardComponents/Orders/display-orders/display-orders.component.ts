import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../Service/order.service';
import { IOrder } from '../../../models/IOrder';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../Components/Shared/spinner/spinner.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-display-orders',
  standalone: true,
  imports: [CommonModule,RouterLink,SpinnerComponent,MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './display-orders.component.html',
  styleUrl: './display-orders.component.css'
})
export class DisplayOrdersComponent implements OnInit{
  
  orders:IOrder[]=[];
  loading:boolean=true;
  
    displayedColumns: string[] = ['userId','date', 'time','totalPrice','country','city','address','id'];  //equal to the property on the element (matColumnDef="date")
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private service:OrderService) {
  }
  ngOnInit(): void {
    this.allOrders();
  }

  allOrders(){
    this.service.getAllOrders().subscribe((res:any)=>{
      this.orders=res as IOrder[];
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
