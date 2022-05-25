import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {  }
  IsLoggedIn(){
    return !! localStorage.getItem('token');
  }
  IsLoggedOut(){
    return localStorage.removeItem('token');
  }
}
