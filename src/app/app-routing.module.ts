import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {DatatableComponent} from "./components/datatable/datatable.component";
import {UploadFileComponent} from "./components/upload-file/upload-file.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./services/auth.guard";
import {SideNavBarComponent} from "./components/side-nav-bar/side-nav-bar.component";

const routes: Routes = [
  {path:'',canActivate:[AuthGuard],component:SideNavBarComponent,children:[
      {path:'home',component:DashboardComponent},
      {path:'dataTable',component: DatatableComponent},
      {path:'upload-file',component:UploadFileComponent},
    ]},


  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

