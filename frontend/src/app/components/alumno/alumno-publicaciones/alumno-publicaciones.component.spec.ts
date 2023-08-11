import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoPublicacionesComponent } from './alumno-publicaciones.component';

describe('AlumnoPublicacionesComponent', () => {
  let component: AlumnoPublicacionesComponent;
  let fixture: ComponentFixture<AlumnoPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoPublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
