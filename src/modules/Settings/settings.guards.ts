import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, Router,
    ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services'

@Injectable()
export class SettingsGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(!this.authService.getCookie('token')){
        this.router.navigate(['/login'])
      }
      return true
    }
}