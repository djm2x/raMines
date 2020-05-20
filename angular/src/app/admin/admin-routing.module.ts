import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AdminGuard]},
      { path: 'direction', loadChildren: () => import('./organisme/organisme.module').then(m => m.OrganismeModule), },
      { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule), canActivate: [AdminGuard]},
      { path: 'compte', loadChildren: () => import('./compte/compte.module').then(m => m.CompteModule), canActivate: [AdminGuard] },
      { path: 'region', loadChildren: () => import('./region/region.module').then(m => m.RegionModule), canActivate: [AdminGuard] },
      { path: 'province', loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule), canActivate: [AdminGuard] },
      // tslint:disable-next-line: max-line-length
      { path: 'electricite', loadChildren: () => import('./electricite/electricite.module').then(m => m.ElectriciteModule), canActivate: [AdminGuard] },
      // tslint:disable-next-line: max-line-length
      { path: 'typeprojet', loadChildren: () => import('./typeprojet/typeprojet.module').then(m => m.TypeprojetModule), canActivate: [AdminGuard] },
      { path: 'commune', loadChildren: () => import('./commune/commune.module').then(m => m.CommuneModule), canActivate: [AdminGuard] },
      // tslint:disable-next-line: max-line-length
      { path: 'projet-enr', loadChildren: () => import('./projet-enr/projet-enr.module').then(m => m.ProjetEnrModule), canActivate: [AdminGuard] },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
