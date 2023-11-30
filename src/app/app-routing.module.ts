import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
    {path: 'home',component: HomeComponent},
    {path: 'details',component: ViewDetailsComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'}  
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}