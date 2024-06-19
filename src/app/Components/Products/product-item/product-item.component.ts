import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../models/IProduct';
import { ICartType } from '../../../models/ICartType';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {

  @Input() data!:IProduct ;
  // @Output() item = new EventEmitter()
  amount:number =0;

  constructor(private toastr: ToastrService) {
    
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // data!:IProduct;
  cartProducts:ICartType[]=[]   
  itemWithQuant!:ICartType
  iconAdded:boolean=false;
  // add(){
  //   this.item.emit(this.data )
  // }

  addToCart(item:IProduct){
    this.itemWithQuant={item:item,quantity:1}

    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);  
      //!-> to handle null   //JSON.parse -> from string to json
      if(this.cartProducts.find(x=>x.item.id==item.id) ){
        console.log('toaster no.1')
        // this.toastr.warning('product is already exist', 'Excuse me!');
        this.toastr.warning('Product is already in cart', 'Warning');


      }
      else{
        this.cartProducts.push(this.itemWithQuant);
        localStorage.setItem("cart",JSON.stringify(this.cartProducts))  //JSON.stringify -> from json to string
        this.iconAdded=true;
        console.log('toaster no.2')
        // this.toastr.success('Product is added successfully', 'Done');
        this.toastr.success('Product added to cart', 'Success');
      }
    }
    else{
      this.cartProducts.push(this.itemWithQuant);
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))  //JSON.stringify -> from json to string
      this.iconAdded=true;
      console.log('toaster no.3')

      this.toastr.success('Product is added successfully', 'Done');
    }
  }

  




}
