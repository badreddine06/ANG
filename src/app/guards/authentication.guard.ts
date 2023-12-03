import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
constructor(private authService: AuthenticationService, private router: Router){

}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Retourner true si l'utilisateur est autorisé à accéder à la route ou false / UrlTree (redirection) s'il ne l'est pas.
   let authenticated= this.authService.isAuthenticated()
    if(authenticated==false) {
      this.router.navigateByUrl("/login");
      return false;
    }
    else{
      return true;
        }}}
//on a creer un root pour implenter il fauter ajouter dans system de routage
