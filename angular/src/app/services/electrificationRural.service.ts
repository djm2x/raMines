import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { ElectrificationRural } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class ElectrificationRuralService  extends SuperService<ElectrificationRural> {

  constructor() {
    super('ElectrificationRurals');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, idRegion, idProvince) {
    return this.http.get(
      `${this.urlApi}/${this.controller}/GetAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${idRegion}/${idProvince}`
      );
  }

  
  getForStatistique() {
    return this.http.get(`${this.urlApi}/${this.controller}/getForStatistique`);
  }
}
