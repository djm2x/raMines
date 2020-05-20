import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeprojetComponent } from './typeprojet.component';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from 'src/app/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleModule } from '../components/title/title.module';
import { UpdateComponent } from './update/update.component';
import { TypeProjetRoutingModule } from './typeprojet-routing.module';




@NgModule({
  declarations: [TypeprojetComponent, UpdateComponent],
  imports: [
    CommonModule,
    TypeProjetRoutingModule,
    HttpClientModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    TitleModule
  ]
  ,
  entryComponents: [
    UpdateComponent
  ]
})


export class TypeprojetModule { }
