import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePlanFormComponent } from './balance-plan-form.component';

describe('BalancePlanFormComponent', () => {
  let component: BalancePlanFormComponent;
  let fixture: ComponentFixture<BalancePlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancePlanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancePlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
