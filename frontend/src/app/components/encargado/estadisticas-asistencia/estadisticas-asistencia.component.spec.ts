import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasAsistenciaComponent } from './estadisticas-asistencia.component';

describe('EstadisticasAsistenciaComponent', () => {
  let component: EstadisticasAsistenciaComponent;
  let fixture: ComponentFixture<EstadisticasAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
