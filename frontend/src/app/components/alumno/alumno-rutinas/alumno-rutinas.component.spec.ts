import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoRutinasComponent } from './alumno-rutinas.component';

describe('AlumnoRutinasComponent', () => {
  let component: AlumnoRutinasComponent;
  let fixture: ComponentFixture<AlumnoRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoRutinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
