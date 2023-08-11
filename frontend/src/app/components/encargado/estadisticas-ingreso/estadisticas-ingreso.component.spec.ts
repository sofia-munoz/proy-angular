import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasIngresoComponent } from './estadisticas-ingreso.component';

describe('EstadisticasIngresoComponent', () => {
  let component: EstadisticasIngresoComponent;
  let fixture: ComponentFixture<EstadisticasIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
