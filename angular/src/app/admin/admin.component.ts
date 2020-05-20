import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatButton } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { routerTransition } from '../shared/animations';
import { SessionService } from '../shared';
import { User } from '../Models/models';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routerTransition],
})
export class AdminComponent implements OnInit {
  @ViewChild('btndev', { static: true }) btndev: MatButton;
  @ViewChild('snav', { static: true }) snav: any;
  keyDevTools = '';
  panelOpenState = false;
  mobileQuery: MediaQueryList;
  currentSection = 'section1';
  userImg = '../../assets/caisse.jpg';
  opened = false;
  idRole = -1;
  isConnected = false;
  // montantCaisse = this.s.notify;
  route = this.router.url;
  user = new User();
  constructor(public session: SessionService, changeDetectorRef: ChangeDetectorRef
    , media: MediaMatcher, public router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener((e: MediaQueryListEvent) => changeDetectorRef.detectChanges());
  }

  ngOnInit() {


    this.getRoute();
    setTimeout(() => {
      this.user = this.session.user;
      console.log(this.user);
      this.snav.toggle();
    }, 100);

  }

  get patchRoute() { return this.route.split('/'); }

  getRoute() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        this.route = route.url;
        console.log(this.route);
      }
    });
  }



  disconnect() {
    this.session.doSignOut();
    this.router.navigate(['/auth']);
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  displayName() {
    if (this.session.isMetier) {
      return ` ${this.session.user.profil.label} - ${this.session.metiers[this.session.user.idMetier - 1].name}`;
      // return this.session.user.profil.label + '-' + this.session.metiers[this.session.user.idMetier - 1].name;

    } else {
      return this.session.user.profil.label;
    }
  }
}
