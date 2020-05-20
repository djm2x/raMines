import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Commune } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class CommuneService  extends SuperService<Commune> {

  constructor() {
    super('Communes');
  }

}
