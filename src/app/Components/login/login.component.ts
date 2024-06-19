import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service';
import { JwtPayload } from '../Services/jwt-payload.interface'; 
import { HeaderComponent } from '../Shared/header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [HeaderComponent , FooterComponent , CommonModule , ReactiveFormsModule],
  styleUrls: ['./login.component.css'],
  standalone:true
})
export class LoginComponent {

  isLoading: boolean = false;
  loginError: string = '';
  response :any;

  LoginForm: FormGroup = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required])
  });

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}


  handleLogin() {
    console.log("login")
    this.isLoading = true;
    this.loginError = '';
    

    if (this.LoginForm.valid) {
      const { Email, Password } = this.LoginForm.value;
      this.authService.login(Email, Password).subscribe({
        next: (res:any ) => {
          console.log(res)
          
          if(res){
            localStorage.setItem('token',res.token);
            localStorage.setItem('isAdmin',res.isAdmin);
            console.log(res.isAdmin)
            if(res.isAdmin==true){
              this.router.navigate(['/admin']);
            }else{
              this.router.navigate(['']);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.loginError = 'An error occurred. Please try again.';
        }
      });
    } 
  }
}
