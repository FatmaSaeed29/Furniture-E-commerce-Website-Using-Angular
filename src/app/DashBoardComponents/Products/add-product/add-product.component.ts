import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Components/Products/Service/products.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { error } from 'jquery';
import { Route, Router, RouterEvent, RouterLink, RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  categories:any[]=[];  
  base64:any='';
  error:boolean=false;
  form!:FormGroup;
  selectedFile:File | null=null;
  imageName:string="";

  constructor(private service:ProductsService, private build:FormBuilder,private router: Router,private http:HttpClient) {

  }

  ngOnInit():void{
    
    this.getCategories();
    this.form=this.build.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      price: ['',[Validators.required,Validators.min(1)]],
      description: ['',[Validators.required,Validators.minLength(5)]],
      quantity: ['',[Validators.required,Validators.min(1)]],
      image: ['',[Validators.required]],
      categoryID: ['',[Validators.required]]
    });
  }
  getCategories(){
    this.service.getAllCategories().subscribe((res:any)=>{
      this.categories=res;
    },(error)=>{
      alert("error")   
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

  addProduct(){
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>("https://localhost:44374/api/Images/upload",formData).subscribe({
      next:(response)=>{
       this.form.patchValue({ image:response });       
       this.service.addProduct(this.form.value).subscribe({
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
