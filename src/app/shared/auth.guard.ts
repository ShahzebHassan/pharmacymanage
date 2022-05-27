// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private routes:Router){ }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): 
//       boolean{
//         const email= "sh@gmail.com" ;
//         const password = "11111";
//      if(email&& password!=null)
//       {
//         return true;
//       }
//       else{
//         this.routes.navigate(['login']);
//         return false;
//       }
//   }
  
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router : Router,private auth: AuthService){}
  canActivate(){
    if(this.auth.IsloggedIn()){
      return true;
    }
    alert("Please login First")
    this.router.navigate(['login']);
    return false;

  }
  
  
}
