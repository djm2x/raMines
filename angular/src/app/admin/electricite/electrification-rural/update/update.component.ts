import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'q';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, ElectrificationRural } from 'src/app/Models/models';
import { UowService } from 'src/app/services/uow.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  // loading = false;
  // submitted = false;
  // returnUrl: string;
  // error: string;
  provinces = this.uow.provinces.get();
  public myForm: FormGroup;
  o = new ElectrificationRural();
  id = 0;
  title = 'Nouveau utilisateur';
  constructor(
    private route: ActivatedRoute, private router: Router,
    public uow: UowService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id !== 0) {
      this.uow.electrificationRurals.getOne(this.id).subscribe(r => {
        this.o = r as any;
        console.log(this.o);
        this.title = 'Electrification rurale';
        this.createForm();
      });
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      idProvince: [this.o.idProvince, Validators.required],
      nbrLogement: [this.o.nbrLogement, Validators.required],
      nbrVillage: [this.o.nbrVillage, [Validators.required]],
      tauxElectrification: [this.o.tauxElectrification, Validators.required],
      annee: [this.o.annee, Validators.required],
      mois: [this.o.mois, Validators.required],
    });
  }
  submit(f: FormGroup) {
    const electrificationrural = f.value;
    electrificationrural.date = this.uow.valideDate(electrificationrural.date);
    console.log(electrificationrural);
    if (this.id === 0) {
      this.uow.electrificationRurals.post(electrificationrural).subscribe(r => {
        this.router.navigateByUrl('/admin/electricite/electrification-rural/list');
      });
    } else {

      this.uow.electrificationRurals.put(electrificationrural.id, electrificationrural).subscribe(r => {
        this.router.navigateByUrl('/admin/electricite/electrification-rural/list');
      });
    }
  }
}
