import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../../../models/IProduct';
import { ProductsService } from '../../../Components/Products/Service/products.service';
import { SpinnerComponent } from '../../../Components/Shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
// import { routes } from '../../../app.routes';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-all-products-dash',
  standalone: true,
  imports: [SpinnerComponent,CommonModule,RouterLink,MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './all-products-dash.component.html',
  styleUrl: './all-products-dash.component.css'
})
export class AllProductsDashComponent implements OnInit{

  Products:IProduct[]=[];
  loading:boolean=true;


  displayedColumns: string[] = ['id','image', 'name', 'description','price','quantity','categoryID','categoryName','options']; //this is like proerty on the element -> ( matColumnDef="options")
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service:ProductsService,private router: Router) {   //all functions from service of products component
  }
  ngOnInit(): void {
    this.allProducts();
  }

  allProducts(){
    this.service.getAllProducts().subscribe((res:any)=>{
      this.Products=res as IProduct[];
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading=false;
    },(error)=>{
      alert("Error!! can't get data")
    })
  }

  showSwal(id:number , row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            this.service.deleteProduct(id).subscribe((res)=>{
                this.Products=this.Products.filter(x=>x.id != id);
                Swal.fire('Done', 'Product is deleted successfully', 'success');

               
            },(error)=>{
                Swal.fire('Wrong', 'try again later', 'error');
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Your action has been cancelled :)');
        }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }    
  }
}
