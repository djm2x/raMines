import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectrificationRuralComponent } from './electrification-rural.component';

describe('ElectrificationRuralComponent', () => {
  let component: ElectrificationRuralComponent;
  let fixture: ComponentFixture<ElectrificationRuralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectrificationRuralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectrificationRuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
