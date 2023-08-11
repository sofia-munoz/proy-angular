import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosFormComponent } from './insumos-form.component';

describe('InsumosFormComponent', () => {
  let component: InsumosFormComponent;
  let fixture: ComponentFixture<InsumosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
