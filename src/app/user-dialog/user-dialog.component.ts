import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  informationForm ! : FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialRef : MatDialogRef<UserDialogComponent>) { }

  ngOnInit(): void {
    
    this.informationForm =this.formBuilder.group({
     Username : ['',Validators.required] ,
     Email : ['',Validators.required] ,
     Address : ['',Validators.required] 
    })
   if(this.editData){
     this.actionBtn = "Update";
     this.informationForm.controls['Username'].setValue(this.editData.Username);
     this.informationForm.controls['Email'].setValue(this.editData.Email);
     this.informationForm.controls['Address'].setValue(this.editData.Address);
   }

  }
  
 addData(){
   console.log(this.informationForm.value);
   
  if(!this.editData){
    if(this.informationForm.valid){
      this.api.postUserInfo(this.informationForm.value)
      .subscribe({
        next:(res)=>{
          alert("Info added successfully");
          this.dialRef.close('save');
          this.informationForm.reset();
 
        },
        error:()=>{
          alert("Error while adding Info");
        }
 
      })
    }
  }else{
    this.updateInfo()
  }
 }
 updateInfo(){
   this.api.putUserInfo(this.informationForm.value,this.editData._id)
   .subscribe({
     next:(res)=>{
       alert('Updated Successfully');
       this.informationForm.reset();
       this.dialRef.close('update');
     },
     error:()=>{
      alert("Error while updating!!");
    }

   })
 }
  refresh() {
    
    throw new Error('Method not implemented.');
  }
}
