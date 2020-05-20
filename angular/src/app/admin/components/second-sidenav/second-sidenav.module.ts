import { MatModule } from './../../../mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondSidenavComponent } from './second-sidenav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SecondSidenavComponent],
  imports: [
    CommonModule,
    MatModule,
    RouterModule,
  ],
  exports: [
    SecondSidenavComponent
  ]
})
export class SecondSidenavModule { }
