import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoFormModificarComponent } from './alumno-form-modificar.component';

describe('AlumnoFormModificarComponent', () => {
  let component: AlumnoFormModificarComponent;
  let fixture: ComponentFixture<AlumnoFormModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoFormModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoFormModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
