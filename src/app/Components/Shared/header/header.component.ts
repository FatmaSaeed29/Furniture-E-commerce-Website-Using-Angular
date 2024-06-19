import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet , RouterLink , RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


}