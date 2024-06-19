import { CartsService } from '../admin-cart/Service/carts.service';
import { Component } from '@angular/core';
// import { CartsService } from '../../Components/Cart/Service/carts.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-cart',
  standalone: true,
  imports: [FormsModule, CommonModule , ReactiveFormsModule ],
  templateUrl: './admin-cart.component.html',
  styleUrl: './admin-cart.component.css'
})
export class AdminCartComponent {
  constructor(private service:CartsService , private build:FormBuilder) {}
  
  carts: any[] = [];
  form!:FormGroup

  ngOnInit(): void {
    this.form = this.build.group({
      start : [''],
      end : ['']
    })
    this.getAllCarts()
  }

  getAllCarts(){
    this.service.getAllCart().subscribe((res:any)=>{
      this.carts = res
    })
  }

  applyFilter(){
    console.log(this.form.value)
    let date = this.form.value
    this.service.getAllCart(date).subscribe((res:any)=>{
      this.carts = res
    })
  }

  deleteCart(id:number){
    
  }
  
}
