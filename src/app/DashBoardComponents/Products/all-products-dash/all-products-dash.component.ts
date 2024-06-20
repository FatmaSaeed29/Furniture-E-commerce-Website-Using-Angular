import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/IProduct';
import { ProductsService } from '../../../Components/Products/Service/products.service';
import { SpinnerComponent } from '../../../Components/Shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { routes } from '../../../app.routes';


@Component({
  selector: 'app-all-products-dash',
  standalone: true,
  imports: [SpinnerComponent,CommonModule,RouterLink],
  templateUrl: './all-products-dash.component.html',
  styleUrl: './all-products-dash.component.css'
})
export class AllProductsDashComponent implements OnInit{

  Products:IProduct[]=[];
  loading:boolean=true;

  constructor(private service:ProductsService,private router: Router) {   //all functions from service of products component
  }
  ngOnInit(): void {
    this.allProducts();
  }

  allProducts(){
    this.service.getAllProducts().subscribe((res)=>{
      this.Products=res as IProduct[];
      this.loading=false;
    },(error)=>{
      alert("Error!! can't get data")
    })
  }

  showSwal(id:number){
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
}
