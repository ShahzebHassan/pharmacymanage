import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  toppings = new FormControl();
  isShown: boolean = false ; // hidden by default
  
toggleShow() {

this.isShown = ! this.isShown;

}

isShown1: boolean = false ; // hidden by default

toggleShow1() {

this.isShown1 = ! this.isShown1;

}

isShown2: boolean = false ; // hidden by default

toggleShow2() {

this.isShown2 = ! this.isShown2;

}


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private _snackBar: MatSnackBar,private cookieService: CookieService) {}
  ngOnInit(): void {}
  logout(){
    // window.localStorage.clear();
    this.cookieService.deleteAll();
    this._snackBar.open("logged Out", "", {
      duration: 2000,
      
    });
    this.router.navigate(['login']);

  }

}
