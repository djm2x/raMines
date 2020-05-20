import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectriciteComponent } from './electricite.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: ElectriciteComponent,
    children: [
      { path: '', redirectTo: 'electrification-rural', pathMatch: 'full'},
      { path: 'electrification-rural', loadChildren: () => import('./electrification-rural/electrification-rural.module')
      .then(m => m.ElectrificationRuralModule), },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectriciteRoutingModule { }
