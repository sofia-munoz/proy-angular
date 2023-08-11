import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAsistenciasComponent } from './alumno-asistencias.component';

describe('AlumnoAsistenciasComponent', () => {
  let component: AlumnoAsistenciasComponent;
  let fixture: ComponentFixture<AlumnoAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAsistenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
