import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  informationForm ! : FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    
    this.informationForm =this.formBuilder.group({
     Name : ['',Validators.required] ,
     Quantity : ['',Validators.required] ,
     Price : ['',Validators.required] 
    })
   if(this.editData){
     this.actionBtn = "Update";
     this.informationForm.controls['Name'].setValue(this.editData.Name);
     this.informationForm.controls['Quantity'].setValue(this.editData.Quantity);
     this.informationForm.controls['Price'].setValue(this.editData.Price);
   }

  }
  
 addInfo(){
  if(!this.editData){
    if(this.informationForm.valid){
      this.api.postInfo(this.informationForm.value)
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
   this.api.putInfo(this.informationForm.value,this.editData._id)
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
