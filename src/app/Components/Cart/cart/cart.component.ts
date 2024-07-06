import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartsService } from '../Service/carts.service';
import { RouterLink } from '@angular/router';
import { ICartType } from '../../../models/ICartType';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service:CartsService) {}
  
  cartProducts: ICartType[] = [];
  total: number = 0;
  success:boolean =false;
  clearedCart:boolean=false;
  itemquantity:number = 0 ;

  ngOnInit(): void {
    this.getCartProduct();
  }



  getCartProduct() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!) // ! to skip the null

      if(this.cartProducts.length==0){
        this.clearedCart=true;
      }
      else{
        this.getCartTotalPrice();
      }
      
    }
    else{
      this.clearedCart=true;
    }
  }

  getCartTotalPrice() {
    this.total = 0;

    for (let product of this.cartProducts) {
      if (!isNaN(product.item.price) && !isNaN(product.quantity)) {
        this.total += product.item.price * product.quantity;
      } else {
        console.error("Invalid price or quantity:", product);
      }
    }

    console.log("Total Price:", this.total);
  }



  plusAmount(index:number){
    this.itemquantity = this.cartProducts[index].quantity;
    if(this.itemquantity<this.cartProducts[index].item.quantity){
      this.cartProducts[index].quantity++
      this.detectChange();
    }

  }

  minAmount(index:number){
    this.itemquantity = this.cartProducts[index].quantity;
    if(this.itemquantity>1){
          this.cartProducts[index].quantity--
          this.detectChange()
      }

  }

  detectChange(){
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
    this.getCartTotalPrice();

  }

  // deleteProduct(index: number) {
  //   this.cartProducts.splice(index, 1); 
  //   this.detectChange();
  // }
  deleteProduct(index: number) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove this item from the cart?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
        if (result.isConfirmed) {
            this.cartProducts.splice(index, 1);
            this.detectChange();

            // If the cart is empty after deletion, show cleared cart message
            if (this.cartProducts.length === 0) {
                this.clearedCart = true;
            }

            Swal.fire(
                'Deleted!',
                'The item has been removed from your cart.',
                'success'
            )
        }
    });
}


  // clearCart(){
  //   localStorage.removeItem("cart");
  //   this.clearedCart=true;
  // }
  clearCart() {
    localStorage.removeItem("cart");
    this.clearedCart = true;
    this.cartProducts = [];
}


  //? Add Cart To Order Table in api

  checkOut(){
    let products = this.cartProducts.map(item => {
      return {productId : item.item.id , quantity: item.quantity , price: item.item.price * item.quantity}
    })
    let Order = {
      userId:1,
      promoId:2,
      date:new Date(),
      totalPrice:this.total,
      country:"test",
      city:"test",
      address:"test",
      orderItems: products
      
    }

    this.service.checkout(Order).subscribe(res=>{
      this.success = true;
      // this.checkoutError=1;
      this.clearCart();
    },(error)=>{
      // this.checkoutError=2;  
      console.log("erroe");
      
    });
  }


  // checkOut(){
  //   let arr = this.data.map(item=>{
  //     return {productId: item.item.id, quantity: item.quantity, price: item.item.price * item.quantity}
  //   })
  //   this.order={
  //     userId:1,
  //     promoId:1,
  //     date:new Date(),
  //     totalPrice:this.totalPrice,
  //     country:"test",
  //     city:"test",
  //     address:"test",
  //     orderItems: arr
      
  //   }
  //   // call service
  //   this.service.checkout(this.order).subscribe((res)=>{
  //     this.checkoutError=1;  //error=false
  //     this.clearCart();
      
  //   },(error)=>{
  //     this.checkoutError=2;  //error=true
  //     console.log("erroe");
      
  //   });
  // }


}
