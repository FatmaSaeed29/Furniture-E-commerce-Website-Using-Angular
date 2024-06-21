import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../Components/Services/auth-service';
import { Router } from '@angular/router';
import { EmailValidatorService } from '../../Components/Services/email-validator.service';
import { MustMatch } from '../../Validators/must-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    
  constructor( private authService : AuthServiceService , private router: Router , private emailValidator:EmailValidatorService ) {}

  isLoading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    FirstName: new FormControl(null , [Validators.required , Validators.minLength(3) ]),
    LastName: new FormControl(null , [Validators.required , Validators.minLength(3)]),
    // Email: new FormControl(null , [Validators.required , Validators.email]),
    Email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
      updateOn: 'blur'
    }),
    Phone: new FormControl(null , [Validators.required , Validators.minLength(11) , Validators.maxLength(11)/*, Validators.pattern(/^01[0125][0-9]{5}$/) */]), //? Checks that it is an Egyptian Number
    Password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    ConfirmPassword: new FormControl(null , [Validators.required ]) ,
  } , {
    validators: MustMatch('Password', 'ConfirmPassword')
  });

  handleRegister(registerForm:FormGroup)
  {
    this.isLoading=true;
    if(registerForm.valid)
      {
        this.isLoading=false;
        this.authService.register(registerForm.value).subscribe({
          next:(response) => {
            console.log(response);
            this.router.navigate(['/login']);

          },
          error:(error) => this.isLoading=true
        });
      }
  }
}
