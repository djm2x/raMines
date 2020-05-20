import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'q';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/models';
import { UowService } from 'src/app/services/uow.service';
import { SessionService } from 'src/app/shared';


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
  profils = this.uow.profils.get();
  organismes = [];
  public myForm: FormGroup;
  hide = true;
  hide2 = true;
  o = new User();
  id = 0;
  title = 'Nouveau utilisateur';

  types = [{ id: 1, name: 'Central' }, { id: 2, name: 'Regional' }];
  regions = this.uow.regions.get();
  metiers = this.session.metiers;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uow: UowService,
    private fb: FormBuilder,
    public session: SessionService
  ) { }

  ngOnInit() {
    this.createForm();

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id !== 0) {
      this.uow.users.getOne(this.id).subscribe(r => {
        this.o = r as User;
        console.log(this.o);
        this.title = 'Modifier Utilisateur';
        this.uow.organismes.getByForeignkey(this.o.idRegion).subscribe(r => {
          this.organismes = r as any[];
          this.myForm.get('idOrganisme').patchValue(this.o.idOrganisme);
        });
        this.createForm();
      });
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      nom: [this.o.nom, Validators.required],
      prenom: [this.o.prenom, Validators.required],
      email: [this.o.email, [Validators.email,Validators.required]],
      password: [this.o.password, Validators.required],
      password2: [this.o.password, Validators.required],
      adresse: [this.o.adresse],
      tel: [this.o.tel],
      fix: [this.o.fix],
      username: [this.o.username, Validators.required],
      actif: [this.o.actif, Validators.required],
      idOrganisme: [this.o.idOrganisme],
      idProfil: [this.o.idProfil, Validators.required],
      idType: [this.o.idType],
      idRegion: [this.o.idRegion, Validators.required],
      idMetier: [this.o.idMetier],
    });
  }
  submit(f: FormGroup) {
    const user = f.value;
    // user.actif = Number(user.actif);

    if (user.password === user.password2) {
      delete (user as any).password2;

      if (this.id === 0) {
        this.uow.users.post(user).subscribe(r => {
          this.router.navigateByUrl('/admin/user');
        });
      } else {
        console.log(user);
        this.uow.users.put(user.id, user).subscribe(r => {
          this.router.navigateByUrl('/admin/user');
        });
      }
    }
  }

  selectChange(e) {
    console.log(e.value)
    this.uow.organismes.getByForeignkey(e.value).subscribe(r => {
      this.organismes = r as any[];
    });
  }

  selectChangeProfil(idProfil) {
    // console.warn(idProfil)
    if (idProfil.value === 4) {
      this.myForm.get('idRegion').setValue(null)
      this.myForm.get('idOrganisme').setValue(null)

    }
    if(idProfil.value === 3)
    {
      this.myForm.get('idRegion').setValidators([ Validators.required])
      this.myForm.get('idRegion').updateValueAndValidity();
      this.myForm.get('idOrganisme').setValidators([ Validators.required])
      this.myForm.get('idOrganisme').updateValueAndValidity();
    }
    else
    {
      this.myForm.get('idRegion').clearValidators()
      this.myForm.get('idRegion').updateValueAndValidity();
      this.myForm.get('idOrganisme').clearValidators()
      this.myForm.get('idOrganisme').updateValueAndValidity();
    }
  }
}
