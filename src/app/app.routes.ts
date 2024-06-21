import { Routes } from '@angular/router';
import { AllProductsComponent } from './Components/Products/all-products/all-products.component';
// import { AllProductsComponent } from './Admin/all-products/all-products.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { BlogComponent } from './Components/blog/blog.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AuthGuard } from './Components/Shared/Services/auth.guard';
import { OrderItemsComponent } from './DashBoardComponents/Orders/order-items/order-items.component';
import { DisplayOrdersComponent } from './DashBoardComponents/Orders/display-orders/display-orders.component';
import { AllProductsDashComponent } from './DashBoardComponents/Products/all-products-dash/all-products-dash.component';
import { AddProductComponent } from './DashBoardComponents/Products/add-product/add-product.component';
import { EditProductComponent } from './DashBoardComponents/Products/edit-product/edit-product.component';
import { UserLayoutComponent } from './Layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { LoginRegisterComponent } from './Layouts/Shared/login-register/login-register.component';


export const routes: Routes = [
    {path:"" , component:UserLayoutComponent,children:[
        {path:"" , redirectTo:"/home",pathMatch:"full"},
        {path:"home" , component:HomeComponent},
        {path:"products" , component:AllProductsComponent},
        {path:"blog" , component:BlogComponent},
        {path:"contact" , component:ContactComponent},
        {path:"details/:id" , component:ProductDetailsComponent},
        {path:"cart" , component:CartComponent}
    ]},
    {path:"dashboard" , component:AdminLayoutComponent, canActivate: [AuthGuard],children:[
        {path:"",redirectTo:"products",pathMatch:"prefix"},
        {path:"products",component:AllProductsDashComponent},
        {path:"products/addProduct",component:AddProductComponent},
        {path:"orders",component:DisplayOrdersComponent},
        {path:"orders/orderItems/:id",component:OrderItemsComponent},
        {path:"products/editProduct/:id",component:EditProductComponent}        
    ]},
    {path:"loginregister" , component:LoginRegisterComponent },
    // {path:"register" , component:RegisterComponent },
    // {path:"login" , component:LoginComponent },
    // {path:"",component:AllProductsComponent,canActivate:[AuthGuard]},   //create home page (limit of products and some animation)
    // {path:"admin/orders" , component:DisplayOrdersComponent , canActivate: [AuthGuard]},
    // {path:"admin/orders/items" , component:DashboardComponent , canActivate: [AuthGuard]},
    // {path:"admin" , component:DashboardComponent , canActivate: [AuthGuard]},
    // {path:"admin" , component:DashboardComponent , canActivate: [AuthGuard]},
    // {path:"adminProduct" , component:AdminAllProductsComponent},
    // {path:"admincart" , component:AdminCartComponent , canActivate: [AuthGuard]},
    {path:"**" , component:NotFoundComponent}
];
