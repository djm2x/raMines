import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Province } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService  extends SuperService<Province> {

  constructor() {
    super('Provinces');
  }

  getByIdRegion(id) {
    return this.http.get(`${this.urlApi}/${this.controller}/getByIdRegion/${id}`);
  }

}
