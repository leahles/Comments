import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private router: Router ) {}
  canActivate() {
    if(JSON.parse(localStorage.getItem('currentUser')!) == null){
      this.router.navigate(['/users']);
    }
    return true;
  }
  
}
