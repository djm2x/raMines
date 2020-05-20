import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as moment from 'moment';
import { UowService } from 'src/app/services/uow.service';
import { ElectrificationRural } from 'src/app/Models/models';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.uow.months as any;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40], label: 'Nbr de projet' },
    { data: [28, 48, 40, 19, 86, 27, 90, 80, 81, 56, 55, 40], label: 'Nbr en cours de développement' },
    { data: [28, 48, 40, 19, 86, 27, 90, 80, 81, 56, 55, 40], label: 'Nbr en cours d\'exploitation' },
  ];
  provinces = this.uow.provinces.get();
  communes = this.uow.communes.get();
  years = this.uow.years;

  constructor(private uow: UowService) { }

  ngOnInit() {
    // this.get();
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
      this.barChartLabels = r.map(e => `${e.mois}/${e.annee}`);

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

  selectChange(id) {
    this.get(Number(id));
  }
}
