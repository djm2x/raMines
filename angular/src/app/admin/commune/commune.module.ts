import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommuneRoutingModule } from './commune-routing.module';
import { CommuneComponent } from './commune.component';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from 'src/app/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleModule } from '../components/title/title.module';



@NgModule({
  declarations: [CommuneComponent,UpdateComponent],
  imports: [
    CommonModule,
    CommuneRoutingModule,
    CommonModule,
    HttpClientModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    TitleModule,
  ],
  entryComponents: [
    UpdateComponent
  ]
})

export class CommuneModule { }
