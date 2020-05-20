import { ProfilComponent } from './profil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'profil', redirectTo: '', pathMatch: 'full'},
  { path: '', component: ProfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
