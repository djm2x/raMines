import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Region } from 'src/app/Models/models';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  o: Region;
  title = '';
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
  , private fb: FormBuilder) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: Region): void {
    this.dialogRef.close(o);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      libelle: [this.o.libelle, Validators.required],
    });
  }

  resetForm() {
    this.o = new Region();
    this.createForm();
  }

}
