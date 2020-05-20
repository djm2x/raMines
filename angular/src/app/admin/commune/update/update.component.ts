import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Commune } from 'src/app/Models/models';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  o: Commune;
  title = '';
  provinces = [];
  regions = this.uow.regions.get();
  idRegion = new FormControl(0);
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;

    console.log(this.o);
    if (this.o.id !== 0) {
      this.regionChange(this.o.province.idRegion);
      this.idRegion.setValue(this.o.province.idRegion);
    }

    this.createForm();
  }

  regionChange(idRegion: number) {
    this.uow.provinces.getByIdRegion(idRegion).subscribe(r => {
      this.provinces = r as any[];
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: Commune): void {
    this.dialogRef.close(o);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      libelle: [this.o.libelle, Validators.required],
      idProvince: [this.o.idProvince, Validators.required],
    });
  }

  resetForm() {
    this.o = new Commune();
    this.createForm();
  }

}
