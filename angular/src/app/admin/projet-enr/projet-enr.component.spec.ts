import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetEnrComponent } from './projet-enr.component';

describe('ProjetEnrComponent', () => {
  let component: ProjetEnrComponent;
  let fixture: ComponentFixture<ProjetEnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetEnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetEnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
