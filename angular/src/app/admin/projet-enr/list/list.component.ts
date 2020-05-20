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
    { columnDef: 'libelle', headName: '' },
    { columnDef: 'typeProjet', headName: '' },
    { columnDef: 'province', headName: '' },
    { columnDef: 'commune', headName: '' },
    { columnDef: 'capacite', headName: '' },
    { columnDef: 'investissement', headName: '' },
    { columnDef: 'typeAutorisation', headName: '' },
    { columnDef: 'etatProjet', headName: '' },
    { columnDef: 'date', headName: '' },
    { columnDef: 'option', headName: '' },
  ].map(e => {
    e.headName = e.headName === '' ? e.columnDef.toUpperCase() : e.headName;
    return e;
  });
  //
  panelOpenState = false;
  //
  displayedColumns = this.columnDefs.map(e => e.columnDef);
  provinces = this.uow.provinces.get();
  // province = new FormControl(0);
  idProvince = new FormControl(0);

  constructor(private router: Router, private uow: UowService,
    public dialog: MatDialog, private mydialog: DeleteService,) { }

  ngOnInit() {
    this.getPage(0, 10, 'id', 'desc', 0);
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
          this.idProvince.value ? this.idProvince.value : 0,
        );
      }
    );
  }

  getPage(startIndex, pageSize, sortBy, sortDir, idProvince = 0) {
    this.uow.projetEnr.getAll(startIndex, pageSize, sortBy, sortDir, idProvince).subscribe(
      (r: any) => {
        console.log(r);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );
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

}
