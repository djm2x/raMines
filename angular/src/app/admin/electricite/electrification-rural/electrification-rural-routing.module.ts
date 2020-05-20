import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectrificationRuralComponent } from './electrification-rural.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { StatistiqueComponent } from './statistique/statistique.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: ElectrificationRuralComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
      { path: 'update/:id', component: UpdateComponent },
      { path: 'statistique', component: StatistiqueComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectrificationRuralRoutingModule { }
