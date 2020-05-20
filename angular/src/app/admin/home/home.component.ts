import { Component, OnInit,  } from '@angular/core';
import { Moment } from 'moment';
import { FlatTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // treeControl = new FlatTreeControl<any>(node => node.level, node => node.expandable);
  constructor() { }

  ngOnInit() {
  }

}

