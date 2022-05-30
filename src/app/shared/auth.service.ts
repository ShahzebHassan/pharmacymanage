import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }
  IsloggedIn(){
   // return !!localStorage.getItem('token');
    return this.cookieService.get('Test');
  }
}
