import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  btnclicked:boolean=true;

  signUp(){
    
    console.log(" signUpButton clicked");
      
    this.btnclicked=true;
  }
  signIn(){
    
    console.log(" signInButton clicked");
    this.btnclicked=false;
  }
}
