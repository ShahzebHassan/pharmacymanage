import {OnInit, Component, ViewChild,Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MedicineDialogComponent } from '../medicine-dialog/medicine-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-medicine-table',
  templateUrl: './medicine-table.component.html',
  styleUrls: ['./medicine-table.component.css']
})
export class MedicineTableComponent implements OnInit {

  displayedColumns: string[] = ['id','Medicinename', 'Brand','Address', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog,private api : ApiService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllInfo();
  }
  
  openMedDialog() {
    this.dialog.open(MedicineDialogComponent, {
     width:'30%'
    //  Renderdata without resfreshing Table?
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllInfo();
      }
    })
  }
  getAllInfo(){
    
    this.api.getMedInfo()
    .subscribe({
      next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
        },
      error:(_err)=>{
        this._snackBar.open("Error while Fetching", "", {
          duration: 2000,
        });
      }
    })
      }
    editMedInfo(row : any){
      this.dialog.open(MedicineDialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val === 'update'){
          this.getAllInfo();
        }
      })
     
    }
      deleteProduct(_id:number){
this.api.deleteMedInfo(_id)
.subscribe({
  next:(res)=>{
    this._snackBar.open("Deleted Successfully", "", {
      duration: 2000,
    });
    this.getAllInfo();
  },
  error:()=>{
    this._snackBar.open("Error While Deleting", "", {
      duration: 2000,
    });
  }
})
      }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

