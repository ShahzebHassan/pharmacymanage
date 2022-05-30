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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router : Router,private auth: AuthService,private _snackBar: MatSnackBar){}
  canActivate(){
    if(this.auth.IsloggedIn()){
      return true;
    }
    this._snackBar.open("Please login first", "", {
      duration: 2000,
    });
    this.router.navigate(['login']);
    return false;

  }
  
  
}
