import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { TypeProjet } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class TypeProjetService  extends SuperService<TypeProjet> {

  constructor() {
    super('TypeProjets');
  }

}
