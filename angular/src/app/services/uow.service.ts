import { ProfilService } from './profil.service';
import { OrganismeService } from './organisme.service';
import { UserService } from './user.service';
import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploadService } from './file.upload.service';
import { RegionService } from './region.service';
import { ProvinceService } from './province.service';
import { ElectrificationRuralService } from './electrificationRural.service';
import { CommuneService } from './commune.service';
import { TypeProjetService } from './typeprojet.service';
import { ProjetEnrService } from './projetEnr.service';


@Injectable({
  providedIn: 'root'
})
export class UowService {
  users = new UserService();
  profils = new ProfilService();
  organismes = new OrganismeService();
  files = new FileUploadService();
  regions = new RegionService();
  provinces = new ProvinceService();
  electrificationRurals = new ElectrificationRuralService();
  communes = new CommuneService();
  typeprojets = new TypeProjetService();
  projetEnr = new ProjetEnrService();

  // tslint:disable-next-line: max-line-length
  autorisation = [{ id: 1, name: 'Autorisation provisoire' }, { id: 2, name: 'Autorisation définitive' }, { id: 3, name: 'Non encore autorisé' }];
  etatProjet = [{ id: 1, name: 'En cours de développement' }, { id: 2, name: 'En cours d\'exploitation' }];
  years = [...Array(10).keys()].map(e => (new Date().getFullYear() - 10) + e + 1);
  months = [...Array(12).keys()].map(e => e + 1);
  monthsAlpha = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ].map((e, i) => {
    return { id: i + 1, name: e };
  });
  constructor() { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }
}
