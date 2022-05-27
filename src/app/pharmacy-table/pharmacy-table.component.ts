import {OnInit, Component, ViewChild,Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-pharmacy-table',
  templateUrl: './pharmacy-table.component.html',
  styleUrls: ['./pharmacy-table.component.css']
})
export class PharmacyTableComponent implements OnInit {

  displayedColumns: string[] = ['id','Name', 'Quantity','Price', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog,private api : ApiService,private _snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.getAllInfo();
  }
  
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%'
    //  Renderdata without resfreshing Table?
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllInfo();
      }
    })
  }
  getAllInfo(){
    this.api.getInfo()
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
    editInfo(row : any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val === 'update'){
          this.getAllInfo();
        }
      })
     
    }
 deleteProduct(_id: number){
 this.api.deleteInfo(_id)
.subscribe({
  next:(res)=>{
    this._snackBar.open("Deleted Successfully", "", {
      duration: 2000,
    });
    this.getAllInfo();
    console.log(this.api.deleteInfo);
    
  },
  error:()=>{
    this._snackBar.open("Error while Deleting", "", {
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
