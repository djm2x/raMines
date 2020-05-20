import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Organisme } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class OrganismeService  extends SuperService<Organisme> {

  constructor() {
    super('organismes');
  }

}
