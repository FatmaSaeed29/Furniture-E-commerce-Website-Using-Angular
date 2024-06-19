import { Component } from '@angular/core';
import { AdminCartComponent } from '../admin-cart/admin-cart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminCartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
