import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasLaboralesComponent } from './especialistas-laborales.component';

describe('EspecialistasLaboralesComponent', () => {
  let component: EspecialistasLaboralesComponent;
  let fixture: ComponentFixture<EspecialistasLaboralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialistasLaboralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistasLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
