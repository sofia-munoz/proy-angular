import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoControlPesoComponent } from './alumno-control-peso.component';

describe('AlumnoControlPesoComponent', () => {
  let component: AlumnoControlPesoComponent;
  let fixture: ComponentFixture<AlumnoControlPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoControlPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoControlPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
