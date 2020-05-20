import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommuneComponent } from './commune.component';


const routes: Routes = [
  { path: 'commune', redirectTo: '', pathMatch: 'full'},
  { path: '', component: CommuneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommuneRoutingModule { }


