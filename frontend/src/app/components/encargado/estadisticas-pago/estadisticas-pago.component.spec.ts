import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasPagoComponent } from './estadisticas-pago.component';

describe('EstadisticasPagoComponent', () => {
  let component: EstadisticasPagoComponent;
  let fixture: ComponentFixture<EstadisticasPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
