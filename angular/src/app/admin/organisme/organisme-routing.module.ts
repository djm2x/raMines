import { OrganismeComponent } from './organisme.component';
import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'direction', redirectTo: '', pathMatch: 'full'},
  { path: '', component: OrganismeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class OrganismeRoutingModule { }
