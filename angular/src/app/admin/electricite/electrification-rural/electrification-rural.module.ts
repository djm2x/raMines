import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectrificationRuralRoutingModule } from './electrification-rural-routing.module';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from 'src/app/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ElectrificationRuralComponent } from './electrification-rural.component';
import { TitleModule } from '../../components/title/title.module';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [UpdateComponent, ListComponent, ElectrificationRuralComponent, StatistiqueComponent],
  imports: [
    CommonModule,
    ElectrificationRuralRoutingModule,
    HttpClientModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    TitleModule,
    ChartsModule,
  ]
})
export class ElectrificationRuralModule { }
