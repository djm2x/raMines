import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Region } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class RegionService  extends SuperService<Region> {

  constructor() {
    super('Regions');
  }

}
