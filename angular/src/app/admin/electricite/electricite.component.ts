import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-electricite',
  templateUrl: './electricite.component.html',
  styleUrls: ['./electricite.component.scss']
})
export class ElectriciteComponent implements OnInit {
  opened = true;
  routes = [
    {name: `Projets de production de l'énergie électrique d'origine fossile`, route: 'z'},
    {name: `Renforcement du réseau électrique de distribution`, route: 'd'},
    {name: `Transformateurs`, route: 'f'},
    {name: `Renforcement du réseau électrique de transport`, route: 'r'},
    {name: `Electrification rurale`, route: '/admin/electricite/electrification-rural'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
