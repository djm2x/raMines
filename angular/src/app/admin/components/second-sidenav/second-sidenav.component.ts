import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-second-sidenav',
  templateUrl: './second-sidenav.component.html',
  styleUrls: ['./second-sidenav.component.scss']
})
export class SecondSidenavComponent implements OnInit {
  @Input() routes: {name: string, route: string}[] = [];
  @Input() width = 220;
  opened = true;
  constructor() { }

  ngOnInit() {
  }

}
