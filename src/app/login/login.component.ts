import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup
  constructor(private formBuilder : FormBuilder,private http : HttpClient,private router : Router) { }

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
       alert("Login Success");
      
       localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")
       this.loginForm.value.email=="jk@gmail.com" ? localStorage.setItem('usertype','admin') : localStorage.setItem('usertype','employee')

       this.loginForm.reset();
       this.router.navigate(['navigation']);
     }else{
       alert("user not found!!");
     }
   },error:(err)=>{
     alert('Something went wrong!!')
   }
   })
 }
}
