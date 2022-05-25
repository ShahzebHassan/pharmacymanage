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
       localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhiNjc3MGE5Mjc0ODRiOTBjYWYzNGQiLCJpYXQiOjE2NTMzNzYxMjd9.By1LQN6wDvtYRbzbSkOVUdmNv6j0kE3W_083c5jhBpU")
       this.loginForm.value.email=="pharmacy@gmail.com" ? localStorage.setItem('userType','employee') : localStorage.setItem('userType','admin')
       this.loginForm.reset();
       this.router.navigate(['navigation'])
     }else{
       alert("user not found!!");
     }
   },error:(err)=>{
     alert('Something went wrong!!')
   }
   })
 }
}
