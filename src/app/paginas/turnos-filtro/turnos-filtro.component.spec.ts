import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosFiltroComponent } from './turnos-filtro.component';

describe('TurnosFiltroComponent', () => {
  let component: TurnosFiltroComponent;
  let fixture: ComponentFixture<TurnosFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
