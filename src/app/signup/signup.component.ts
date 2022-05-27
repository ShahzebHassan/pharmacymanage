import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder,private http : HttpClient,private router:Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

   this.signupForm = this.formBuilder.group({
    fullname:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
    mobile:['',Validators.required]

   })
  }

signUp(){
  this.http.post<any>("http://localhost:9000/signupUsers",this.signupForm.value)
  .subscribe({
    next:(res)=>{
      this._snackBar.open("SignUp Successfully", "", {
        duration: 2000,
      });
      this.signupForm.reset();
      this.router.navigate(['login']);
    },error:(err)=>{
      this._snackBar.open("Something Went Wrong", "", {
        duration: 2000,
      });
    }
  })
}
}
