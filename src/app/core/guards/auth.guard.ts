import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (environment.defaultauth === 'firebase') {
            //     const currentUser = this.authenticationService.currentUser();
            //     if (currentUser) {
            //         // logged in so return true
            //         return true;
            //     }
            // } else {
            // const currentUser = this.authFackservice.currentUserValue;
            // if (currentUser) {
            //     // logged in so return true
            //     return true;
            // }
            // }
    
            let account = localStorage.getItem('nu-account');
            // let auth = localStorage.getItem('nu-authentication');
    
            if (account) {
                return true;
            }
    
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url },
            });
            return false;
    }
}
