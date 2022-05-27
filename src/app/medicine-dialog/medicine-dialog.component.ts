import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medicine-dialog',
  templateUrl: './medicine-dialog.component.html',
  styleUrls: ['./medicine-dialog.component.css']
})
export class MedicineDialogComponent implements OnInit {

  informationForm ! : FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,private _snackBar: MatSnackBar,
    private dialRef : MatDialogRef<MedicineDialogComponent>) { }

  ngOnInit(): void {
    
    this.informationForm =this.formBuilder.group({
     Medicinename : ['',Validators.required] ,
     Brand : ['',Validators.required] ,
     Address : ['',Validators.required] 
    })
   if(this.editData){
     this.actionBtn = "Update";
     this.informationForm.controls['Medicinename'].setValue(this.editData.Medicinename);
     this.informationForm.controls['Brand'].setValue(this.editData.Brand);
     this.informationForm.controls['Address'].setValue(this.editData.Address);
   }

  }
  
 addMedData(){
   console.log(this.informationForm.value);
   
  if(!this.editData){
    if(this.informationForm.valid){
      this.api.postMedInfo(this.informationForm.value)
      .subscribe({
        next:(res)=>{
          this._snackBar.open("Info Added Successfully", "", {
            duration: 2000,
          });
          this.dialRef.close('save');
          this.informationForm.reset();
 
        },
        error:()=>{
           this._snackBar.open("Error while Adding Info", "", {
          duration: 2000,
        });
        }
 
      })
    }
  }else{
    this.updateInfo()
  }
 }
 updateInfo(){
   this.api.putMedInfo(this.informationForm.value,this.editData._id)
   .subscribe({
     next:(res)=>{
      this._snackBar.open("Updated Successfully", "", {
        duration: 2000,
      });
       this.informationForm.reset();
       this.dialRef.close('update');
     },
     error:()=>{
      this._snackBar.open("Error while Updating", "", {
        duration: 2000,
      });
    }

   })
 }
  refresh() {
    
    throw new Error('Method not implemented.');
  }
}
