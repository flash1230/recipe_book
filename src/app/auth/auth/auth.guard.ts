import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterEvent, RouterStateSnapshot, UrlTree, } from "@angular/router";
import { Observable, } from "rxjs";
import { map, take,} from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private authservice: AuthService, private router: Router) {}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     boolean | 
     Promise<boolean | UrlTree> |
     Observable<boolean | UrlTree>|
     UrlTree{
         return this.authservice.user.pipe( take(1), map (user=> {
            const isauth = !!user;
            if(isauth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
            
         }));

    }
}