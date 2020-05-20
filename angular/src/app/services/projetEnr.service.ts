import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { ProjetEnr } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class ProjetEnrService  extends SuperService<ProjetEnr> {

  constructor() {
    super('ProjetEnrs');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, idProvince) {
    return this.http.get(
      `${this.urlApi}/${this.controller}/GetAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${idProvince}`
      );
  }

}
