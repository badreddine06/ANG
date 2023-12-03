import { Injectable } from '@angular/core';
import { AppUser } from '../models/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 users : AppUser[]=[] ;
 authenticatedUser :AppUser | undefined;
  constructor() { 
this.users.push({userId: UUID.UUID(),username:"user1",password:"1234",roles:["USER"] });
this.users.push({userId: UUID.UUID(),username:"user2",password:"1234",roles:["USER"] });
this.users.push({userId: UUID.UUID(),username:"admin",password:"1234",roles:["USER","ADMIN"] });

  }
  public login(username:string,password:string): Observable<AppUser> {
  let appUser=this.users.find(u=>u.username === username);
  if(!appUser) return throwError(()=>new Error("User not found"));
  if(appUser.password!=password) return throwError(()=>new Error("Bad password"));
  return of(appUser);
  }

  //on vas utiliser local storage pour ne pas obliger user a chaque fois d'utiliser login et motdepass
  public authenticateUser(appUser:  AppUser):Observable<boolean> {
    this.authenticatedUser=appUser;
    localStorage.setItem("authUser",JSON.stringify({username:appUser.username,roles:appUser.roles,jwt:"JWT-TOKEN"}));
    return of(true);
  }
  public hasRoles(role:string):boolean {
    //l'un des roles est admin
    return this.authenticatedUser!.roles.includes(role);

  }
  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }
  public logOut() :Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of (true);
   }
}