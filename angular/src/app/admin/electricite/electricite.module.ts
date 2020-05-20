import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectriciteRoutingModule } from './electricite-routing.module';
import { ElectriciteComponent } from './electricite.component';
import { SecondSidenavModule } from '../components/second-sidenav/second-sidenav.module';


@NgModule({
  declarations: [ElectriciteComponent],
  imports: [
    CommonModule,
    ElectriciteRoutingModule,
    SecondSidenavModule,
  ]
})
export class ElectriciteModule { }
