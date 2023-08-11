import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasInsumoComponent } from './estadisticas-insumo.component';

describe('EstadisticasInsumoComponent', () => {
  let component: EstadisticasInsumoComponent;
  let fixture: ComponentFixture<EstadisticasInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasInsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
