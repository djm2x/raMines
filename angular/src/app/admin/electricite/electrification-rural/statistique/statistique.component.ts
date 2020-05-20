import { SessionService } from './../../../../shared/session.service';
import { ElectrificationRural, Province } from './../../../../Models/models';
import { UowService } from './../../../../services/uow.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'NBR DE LOGEMENTS' },
    { data: [], label: 'NBR DE VILLAGES' },
    { data: [], label: 'TAUX DE L\'ELECTRIFICATION RURALE EN %' },
  ];
  provinces = [];
  regions = this.uow.regions.get();
  constructor(private uow: UowService, public session: SessionService) { }

  ngOnInit() {
    if (this.session.isPointFocal) {
      
      this.uow.provinces.getByIdRegion(this.session.user.idRegion).subscribe(r => {
        this.provinces = r as any[];
      });
    }
  }

  // get(id) {
  //   this.uow.electrificationRurals.getByForeignkey(id).subscribe((r: {list: ElectrificationRural[], provinces: Province[]}) => {
  //     this.barChartLabels = r.map(e => e.axe);

  //     this.barChartData[0].data = r.map(e => e.recommandations);
  //   });
  // }

  get(id) {
    this.uow.electrificationRurals.getByForeignkey(id).subscribe((r: ElectrificationRural[]) => {
      // this.barChartLabels = r.map(e => moment(new Date(e.date)).format('DD/MM/YYYY'));
      this.barChartLabels = r.map(e => `${this.uow.monthsAlpha[e.mois - 1].name} / ${e.annee}`);

      this.barChartData[0].data = [];
      this.barChartData[1].data = [];
      this.barChartData[2].data = [];

      r.forEach(e => {
        this.barChartData[0].data.push(e.nbrLogement);
        this.barChartData[1].data.push(e.nbrVillage);
        this.barChartData[2].data.push(e.tauxElectrification);
      });
      // this.barChartData[0].data = r.map(e => e.recommandations);
      console.log(r);
    });
  }



  selectChange(name, id) {
    if (name === 'region') {
      this.uow.provinces.getByIdRegion(id).subscribe(r => {
        this.provinces = r as any[];
      });
      
    } else if (name === 'province') {
      this.get(Number(id));
    }
    
  }
}
