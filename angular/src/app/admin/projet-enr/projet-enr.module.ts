import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetEnrRoutingModule } from './projet-enr-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from 'src/app/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleModule } from '../components/title/title.module';
import { ChartsModule } from 'ng2-charts';
import { ProjetEnrComponent } from './projet-enr.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { StatistiqueComponent } from './statistique/statistique.component';


@NgModule({
  declarations: [
    ProjetEnrComponent,
    UpdateComponent, 
    ListComponent, 
    StatistiqueComponent
  ],
  imports: [
    CommonModule,
    ProjetEnrRoutingModule,
    HttpClientModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    TitleModule,
    ChartsModule,
  ]
})
export class ProjetEnrModule { }
