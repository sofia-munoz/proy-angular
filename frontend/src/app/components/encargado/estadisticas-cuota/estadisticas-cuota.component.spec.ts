import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCuotaComponent } from './estadisticas-cuota.component';

describe('EstadisticasCuotaComponent', () => {
  let component: EstadisticasCuotaComponent;
  let fixture: ComponentFixture<EstadisticasCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasCuotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
