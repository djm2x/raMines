import { SessionService } from './../../../../shared/session.service';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Observable, merge } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UowService } from 'src/app/services/uow.service';
import { DeleteService } from 'src/app/admin/components/delete/delete.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new EventEmitter();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  dataSource = [];
  columnDefs = [
    { columnDef: 'province', headName: 'PROVINCE' },
    { columnDef: 'nbrLogement', headName: 'NBR DE LOGEMENTS' },
    { columnDef: 'nbrVillage', headName: 'NBR DE VILLAGES' },
    { columnDef: 'tauxElectrification', headName: 'TAUX' }, //  DE L\'ELECTRIFICATION RURALE EN %
    { columnDef: 'annee', headName: '' }, //  DE L\'ELECTRIFICATION RURALE EN %
    { columnDef: 'mois', headName: '' }, //  DE L\'ELECTRIFICATION RURALE EN %
    { columnDef: 'option', headName: '' },
  ].map(e => {
    e.headName = e.headName === '' ? e.columnDef.toUpperCase() : e.headName;
    return e;
  });

  //
  panelOpenState = false;
  //
  displayedColumns = this.columnDefs.map(e => e.columnDef);
  provinces = [];
  regions = this.uow.regions.get();
  // provinces = this.session.isPointFocal ? this.uow.provinces.getByIdRegion(this.session.user.idRegion) : this.uow.provinces.get();
  // province = new FormControl(0);
  idRegion = new FormControl(0);
  idProvince = new FormControl(0);

  constructor(
    private router: Router,
    private uow: UowService,
    public dialog: MatDialog,
    private mydialog: DeleteService,
    public session: SessionService,
  ) { }

  ngOnInit() {
    // console.warn( (this.idRegion.value ? (this.session.isPointFocal ? this.session.user.idRegion : 0) : 0)
    this.getPage(0, 10, 'id', 'desc', (this.session.isPointFocal ? this.session.user.idRegion : 0), 0);
    if (this.session.isPointFocal) {
      
      this.uow.provinces.getByIdRegion(this.session.user.idRegion).subscribe(r => {
        this.provinces = r as any[];
      });
    }
    merge(...[this.sort.sortChange, this.paginator.page, this.update]).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;
        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.idRegion.value ? (this.session.isPointFocal ? this.session.user.idRegion : 0) : 0,
          this.idProvince.value ? this.idProvince.value : 0,
          // this.idProvince.value ? this.session.isPointFocal ? this.session.user.region.id : 0 : 0,
        );
      }
    );
  }

  getPage(startIndex, pageSize, sortBy, sortDir, idRegion, idProvince = 0) {
    this.uow.electrificationRurals.getAll(startIndex, pageSize, sortBy, sortDir, idRegion, idProvince).subscribe(
      (r: any) => {
        console.log(r);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );
  }

  displayMonth(n) {
    return this.uow.monthsAlpha[n - 1].name;
  }

  // Evenement boutton modifier un utilisateur
  edit(o) {
    this.router.navigateByUrl('/admin/modify?id=' + o.id);
  }
  // Evenement boutton rechercher
  search() {
    this.update.next(true);
  }

  async delete(id) {
    const r = await this.mydialog.openDialog('Utilisateur').toPromise();
    if (r === 'ok') {
      this.uow.projetEnr.delete(id).subscribe(() => this.update.next(true));
    }
  }

  selectChange(name, id) {
    if (name === 'region') {
      this.uow.provinces.getByIdRegion(id).subscribe(r => {
        this.provinces = r as any[];
      });
      
    } else if (name === 'province') {
      // this.get(Number(id));
    }
    
  }

}
