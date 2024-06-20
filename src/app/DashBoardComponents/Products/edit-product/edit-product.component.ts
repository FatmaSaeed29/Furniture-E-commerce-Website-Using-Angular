import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../Components/Products/Service/products.service';
import { IProduct } from '../../../models/IProduct';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  id:number;
  categories:any[]=[];  
  product?:IProduct;
  base64:any='';
  error:boolean=false;
  form!:FormGroup;
  selectedFile:File | null=null;


  constructor(private service:ProductsService,private route:ActivatedRoute, private build:FormBuilder,private router: Router,private http:HttpClient) {
    this.id=Number(route.snapshot.paramMap.get("id"));
  }

  ngOnInit():void{   
    this.setForm();
    this.getProduct();
    this.getCategories();
  }
  getProduct(){
    this.service.getProduct(this.id).subscribe((res:any)=>{
      this.product=res;      
      this.setForm();
    },(error)=>{
      alert("error")   
    });
  }
  getCategories(){
    this.service.getAllCategories().subscribe((res:any)=>{
      this.categories=res;
      
    },(error)=>{
      alert("error")   
    });
  }
  setForm(){
    this.form=this.build.group({
      id:[this.product?.id],
      name: [this.product?.name,[Validators.required,Validators.minLength(5)]],
      price: [this.product?.price,[Validators.required,Validators.min(1)]],
      description: [this.product?.description,[Validators.required,Validators.minLength(5)]],
      quantity: [this.product?.quantity,[Validators.required,Validators.min(1)]],
      image: [this.product?.image,[Validators.required]],
      categoryID: [this.product?.categoryID,[Validators.required]]
    });
  }
  // getImgPath(event:any){
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload=()=>{
  //     this.base64=reader.result
  //     console.log(this.base64);
      
  //   }
  // }
  
  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload=()=>{
            this.base64=reader.result
          }
        }
  }

  // editProduct(){
  //   this.service.editProduct(this.id,this.form.value).subscribe((res)=>{
  //     this.router.navigate(['/dashboard/products']);
  //   },(error)=>{
  //     this.error=true
  //   })
  // }


  editProduct(){
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>("https://localhost:44374/api/Images/upload",formData).subscribe({
      next:(response)=>{
       this.form.patchValue({ image:response });       
       this.service.editProduct(this.id,this.form.value).subscribe({
        next:(x)=>{
          this.router.navigate(['/dashboard/products']);  
        },
        error:()=>{}
        });
      },
      error:()=>{}
    });
    
  }

}
