import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePlanHistoricoComponent } from './balance-plan-historico.component';

describe('BalancePlanHistoricoComponent', () => {
  let component: BalancePlanHistoricoComponent;
  let fixture: ComponentFixture<BalancePlanHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancePlanHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancePlanHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
