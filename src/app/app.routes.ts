import { Routes } from '@angular/router';
import { AllProductsComponent } from './Components/Products/all-products/all-products.component';
// import { AllProductsComponent } from './Admin/all-products/all-products.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HeaderComponent } from './Components/Shared/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AdminCartComponent } from './Admin/admin-cart/admin-cart.component';
import { BlogComponent } from './Components/blog/blog.component';
import { ContactComponent } from './Components/contact/contact.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Components/Services/auth.guard';


export const routes: Routes = [
    // {path : " " , component:HeaderComponent},
    {path:"products" , component:AllProductsComponent , canActivate: [AuthGuard]},
    {path:"blog" , component:BlogComponent , canActivate: [AuthGuard]},
    {path:"contact" , component:ContactComponent , canActivate: [AuthGuard]},
    {path:"register" , component:RegisterComponent },
    {path:"login" , component:LoginComponent },
    {path:"" , component:HomeComponent},
    {path:"details/:id" , component:ProductDetailsComponent , canActivate: [AuthGuard]},
    {path:"cart" , component:CartComponent , canActivate: [AuthGuard]},
    {path:"admin" , component:DashboardComponent , canActivate: [AuthGuard]},
    // {path:"adminProduct" , component:AdminAllProductsComponent},
    {path:"admincart" , component:AdminCartComponent , canActivate: [AuthGuard]},
    {path:"**" , component:NotFoundComponent}
];
