import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup
  cookieValue!: string;
  constructor(private formBuilder : FormBuilder,private http : HttpClient,private router : Router,private _snackBar: MatSnackBar,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

 login(){
   this.http.get<any>('http://localhost:9000/signupUsers')
   .subscribe({
    next:(res)=>{
     const user = res.find((a:any)=>{
      return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
     });
     if(user){
      //  alert("Login Success");
      this._snackBar.open("logged In", "", {
        duration: 2000,
      });
      {
        this.cookieService.set('Test', 'Hello World');
        this.cookieValue = this.cookieService.get('Test');
      }
      //  localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")
      //  this.loginForm.value.email=="jk@gmail.com" ? localStorage.setItem('usertype','admin') : localStorage.setItem('usertype','employee')

       this.loginForm.reset();
       this.router.navigate(['navigation']);
     }else{
      this._snackBar.open("User not Found", "", {
        duration: 2000,
      });
     }
   },error:(err)=>{
    this._snackBar.open("Something Went Wrong", "", {
      duration: 2000,
    });
   }
   })
 }
}
