import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyTableComponent } from './pharmacy-table/pharmacy-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { MedicineTableComponent } from './medicine-table/medicine-table.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [
{path:'',redirectTo:'login', pathMatch :'full'},
{path: 'login' ,component:LoginComponent},
{path: 'signup', component:SignupComponent},
{path: 'navigation',canActivate:[AuthGuard],component: NavigationComponent, children:[
{path: 'pharmacy-table'  ,component: PharmacyTableComponent},
{path: 'user-table'  , component: UserTableComponent},
{path: 'medicine-table' , component: MedicineTableComponent},
{ path: '**' , component: PharmacyTableComponent }, 
]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
