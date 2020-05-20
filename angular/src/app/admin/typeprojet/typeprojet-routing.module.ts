import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeprojetComponent } from './typeprojet.component';


const routes: Routes = [
  { path: 'typeprojet', redirectTo: '', pathMatch: 'full'},
  { path: '', component: TypeprojetComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeProjetRoutingModule { }
