import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {ProductsComponent} from "./products/products.component";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
 // {path :"admin" , component : AdminTemplateComponent},
//ilya un problm quand je suis en admin je clique sur product le root chenge
//de 4200/admin vers 4200/peoducts mais c'est faut il faut 4200/admin/products
  {path :"login" , component : LoginComponent},
//login par defaut 
  {path :"" , component : LoginComponent},
  {path :"admin" , component : AdminTemplateComponent, canActivate:[AuthenticationGuard],
  children: [
    {path :"products" , component : ProductsComponent},
    {path :"customers" , component : CustomersComponent},
    {path :"newProduct" , component : NewProductComponent},
    {path :"editProduct/:id" , component : EditProductComponent},
  ]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
