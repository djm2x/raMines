
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatButton } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-electrification-rural',
  templateUrl: './electrification-rural.component.html',
  styleUrls: ['./electrification-rural.component.scss']
})
export class ElectrificationRuralComponent implements OnInit {
  // @ViewChild('snav', { static: true }) snav: any;
  
  
  constructor(public router: Router) {
  }

  ngOnInit() {

  }
}
