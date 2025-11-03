import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router){}
  canActivate() {
    if(localStorage["JWT_TOKEN"]) return true;
    this.router.navigateByUrl("/login");
    return false;
  }
  
}
