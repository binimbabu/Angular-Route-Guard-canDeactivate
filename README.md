canDeactivate Route Guard

When we are filling a form and suddenly you click on the back button or navigating from current page to different page then a popup appears if 'the data is not saved are you sure you want to leave this page' . canDeactivate guard is activated when we are doing something in the page and without saving you are navigating to the previous link. functional deactivate is the latest one.

example:

app.routing.module.ts

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'form', component: FormComponent },
];

home.component.html

<button (click)="navigateToForm()">Navigate to form</button>


home.component.ts

export class HomeComponent {
  constructor(private router: Router) {}
  navigateToForm() {
    this.router.navigate(['form']);
  }
}


form.component.html

<input type="text" [formControl]="username" />


form.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  username = new FormControl('', Validators.required);
}


Here when we go to home page there is a button 'Navigate to form' which on clicking goes to form webpage. Additionally form page has a input HTML element where we enter value and when we click back button in browser it navigates back to home component web page. Thus the data inside the input element in form webpage is lost. But there will be case where user unintentionally clicks on back button without saving the information in the current page (here form component page).
To resolve this problem when user clicks on the back button without saving the content in the current web page we will get a popup telling information like 'are you share you want to leave this page' this can be done by using deactivate route guard.
To create deactivate function we can type the following command

ng g guard formDeactive --skip-tests --functional=true

use canDeactivate property in the Routes in app.routing.module.ts is given deactivate Guard name as follws

eg:-

  { path: 'form', component: FormComponent, canDeactivate: [formDeactiveGuard] },

Here canDeactivate with formDeactiveGuard as value will be activated when we go from the formcomponent when clicked back or we go backwards. canDeactivate class should have true value from its function then only canDeactivate will be triggered, if false canDeactivate will not be triggered.

Note: canActivate triggers when we go forwards. canActivate class should have true value from its class then only canActicate will be triggered, if false canActivate will not be triggered.

In the form-deactivate-guard.ts file (which is the deactivate function created) , in the below code formDeactiveGuard  body we argument 'component' which here refers to FormComponent. Since, canDeactivate property in app.routing.module.ts given to FOrmComponent. 'component' contains the input formcontrolname 'username'.


form-deactive.guard.ts


import { FormControl } from '@angular/forms';
import { CanDeactivateFn } from '@angular/router';
interface CanDeactivateComponent {
  username: FormControl;
}
export const formDeactiveGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  console.log(component);
  if (component && component?.username && component?.username.dirty) {
    const confirmation = confirm(
      'Do you want to leave this page as content will be lost'
    );
    if (confirmation) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};

Note: if component?.username.dirty is done then and when we click to back button the confirmation popup will appear. Since formDeactiveGuard will be returning true.  And if we click Ok button inpopup it will be navigated to previous page that's 'home' page.

The three other arguments in formDeactiveGuard are  currentRoute, currentState, nextState.

The 'currentRoute' represents the route you are leaving. currentRoute is of type ActivatedRouteSnapshot 
eg:

currentRoute.params['id']   // Access route parameters
currentRoute.data['title']  // Access static data



The currentState refers to the entire router state at the time you're trying to leave. currentState is of type RouterStateSnapshot. Includes the current URL and all child route states.

eg:-

console.log(currentState.url); // e.g., '/user/123/edit'


nextState refers to router state you're trying to navigate to. If nextState is null, it means you're closing the app or doing a non-router-triggered navigation. nextState is of typeRouterStateSnapshot | null

console.log(nextState?.url); // e.g., '/home'


ngOnDestroy added in form.component.ts , ngOndestroy() will be called if we click on the ok button of confirm popup.
