import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosVentasComponent } from './insumos-ventas.component';

describe('InsumosVentasComponent', () => {
  let component: InsumosVentasComponent;
  let fixture: ComponentFixture<InsumosVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumosVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
