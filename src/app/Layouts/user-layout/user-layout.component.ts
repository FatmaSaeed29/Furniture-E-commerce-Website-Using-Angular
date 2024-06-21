import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Components/Shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet , RouterLink , RouterLinkActive ,FooterComponent,CommonModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit{
  loggedIn:boolean=false;

  constructor(private router:Router) {    
  }
  
  ngOnInit(): void {
    if(localStorage.getItem("isAdmin") != null){
      this.loggedIn=true;
    }
    else{
      this.loggedIn=false;
    }
  }

  logout(){
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    this.router.navigate(["/loginregister"]);
  }
}
