import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup , FormControl ,Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MustMatch } from '../../../Validators/must-match.validator';
import { EmailValidatorService } from '../../../Components/Services/email-validator.service';
import { AuthServiceService } from '../../../Components/Services/auth-service';
import { emailPasswordValidator } from '../../../Validators/emailPasswordValidator';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive , ReactiveFormsModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {

constructor(private authService : AuthServiceService , private router: Router , private emailValidator:EmailValidatorService) {
  
  
}

isLoading:boolean = false;
btnclicked:boolean=true;
loginError: string = '';
response :any;

  signUp(){
    
    console.log(" signUpButton clicked");
      
    this.btnclicked=true;
  }
  signIn(){
    
    console.log(" signInButton clicked");
    this.btnclicked=false;
  }

  //? ----- Register Validations ----- ?//

  registerForm:FormGroup = new FormGroup({
    FirstName: new FormControl(null , [Validators.required , Validators.minLength(3) ]),
    LastName: new FormControl(null , [Validators.required , Validators.minLength(3)]),
    // Email: new FormControl(null , [Validators.required , Validators.email]),
    Email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
      updateOn: 'blur'
    }),
    // Phone: new FormControl(null , [Validators.required , Validators.minLength(11) , Validators.maxLength(11)/*, Validators.pattern(/^01[0125][0-9]{5}$/) */]), //? Checks that it is an Egyptian Number
    Password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    ConfirmPassword: new FormControl(null , [Validators.required ]) ,
  } , {
    validators: MustMatch('Password', 'ConfirmPassword')
  });

  handleRegister(registerForm: FormGroup) {
    console.log("entered")
    this.isLoading = true;
    if (registerForm.valid) {
      this.authService.register(registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful!', response);

          console.log(response);
          this.isLoading = false;
          this.btnclicked = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.error("Error occurred:", error);
        }
      });
    } else {
      console.log(registerForm.value);
      // console.log(respo);
      this.isLoading = false;
      console.log("Form is invalid");
    }

    console.log('Registration outside!');

  }


  //? ----- Login Validations ----- ?//
  LoginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  }, { asyncValidators: emailPasswordValidator(this.authService) });


  // handleLogin() {
  //   console.log("login")
  //   this.isLoading = true;
  //   this.loginError = '';
    

  //   if (this.LoginForm.valid) {
  //     const { Email, Password } = this.LoginForm.value;
  //     this.authService.login(Email, Password).subscribe({
  //       next: (res:any ) => {
  //         console.log(res)
          
  //         if(res){
  //           localStorage.setItem('token',res.token);
  //           localStorage.setItem('isAdmin',res.isAdmin);
  //           console.log(res.isAdmin)
  //           if(res.isAdmin==true){
  //             this.router.navigate(['/dashboard']);
  //           }else{
  //             this.router.navigate(['']);
  //           }
  //         }
  //       },
  //       error: (error) => {
  //         console.error(error);
  //         this.loginError = 'An error occurred. Please try again.';
  //       }
  //     });
  //   } 
  // }

  // handleLogin() {
  //   this.isLoading = true;
  //   this.loginError = '';

  //   if (this.LoginForm.valid) {
  //     const { Email, Password } = this.LoginForm.value;
  //     this.authService.checkEmailAndPassword(Email, Password).subscribe({
  //       next: (res: any) => {
  //         if (res) {
  //           localStorage.setItem('token', res.token);
  //           localStorage.setItem('isAdmin', res.isAdmin);
  //           if (res.isAdmin) {
  //             this.router.navigate(['/dashboard']);
  //           } else {
  //             this.router.navigate(['/']);
  //           }
  //         }
  //       },
  //       error: (error) => {
  //         console.error(error);
  //         this.loginError = 'Invalid email or password.';
  //         this.isLoading = false;
  //       }
  //     });
  //   } else {
  //     this.isLoading = false;
  //     this.loginError = 'Form is invalid';
  //   }
  // }
  
  // handleLogin() {
  //   this.isLoading = true;
  //   this.loginError = '';
  
  //   if (this.LoginForm.valid) {
  //     const { Email, Password } = this.LoginForm.value;
  //     this.authService.login(Email, Password).subscribe({
  //       next: (res: any) => {
  //         if (res.token) {
  //           localStorage.setItem('token', res.token);
  //           localStorage.setItem('isAdmin', res.isAdmin);
  //           if (res.isAdmin) {
  //             this.router.navigate(['/dashboard']);
  //           } else {
  //             this.router.navigate(['/']);
  //           }
  //         } else {
  //           this.LoginForm.get('Password')?.setErrors({ 'invalidLogin': true }); 
  //           this.loginError = 'Invalid email or password. Please try again.';
  //         }
  //         this.isLoading = false;
  //       },
  //       error: (error) => {
  //         console.error(error);
  //         this.isLoading = false;
  //         this.loginError = 'An error occurred. Please try again.';
  //       }
  //     });
  //   }
  // }


  handleLogin() {
    this.isLoading = true;
    this.loginError = '';

    if (this.LoginForm.valid) {
      const { Email, Password } = this.LoginForm.value;

      this.authService.login(Email, Password).subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('isAdmin', res.isAdmin);
            if (res.isAdmin) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/']);
            }
          } else {
            this.LoginForm.get('Password')?.setErrors({ 'invalidLogin': true });
            this.loginError = 'Invalid email or password. Please try again.';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.isLoading = false;
          if (error.status === 401) {
            this.LoginForm.get('Password')?.setErrors({ 'invalidLogin': true });
            this.loginError = 'Invalid email or password. Please try again.';
          } else {
            this.loginError = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    } else {
      // Form is invalid, handle accordingly (optional)
      this.isLoading = false;
    }
  }
  
}
