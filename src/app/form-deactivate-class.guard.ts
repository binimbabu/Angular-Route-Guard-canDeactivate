import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDeactivateClassGuard implements CanDeactivate<any> {
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component && component?.username && component?.username?.dirty) {
      console.log(currentRoute, "current Route");
      console.log(currentState, "current State");
      console.log(nextState, "Next State");
      const confirmation = confirm('You have some unsaved details. Are you sure to go back from class guard?');
      if (confirmation) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

}
