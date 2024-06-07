import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { formDeactiveGuard } from './form-deactvate.guard';
import { FormDeactivateClassGuard } from './form-deactivate-class.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'form', component: FormComponent, 
    //canDeactivate: [formDeactiveGuard]
    canDeactivate: [FormDeactivateClassGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }