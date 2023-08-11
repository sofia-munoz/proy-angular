import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePlanComponent } from './balance-plan.component';

describe('BalancePlanComponent', () => {
  let component: BalancePlanComponent;
  let fixture: ComponentFixture<BalancePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
