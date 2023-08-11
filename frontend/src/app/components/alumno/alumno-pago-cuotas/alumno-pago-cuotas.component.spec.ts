import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoPagoCuotasComponent } from './alumno-pago-cuotas.component';

describe('AlumnoPagoCuotasComponent', () => {
  let component: AlumnoPagoCuotasComponent;
  let fixture: ComponentFixture<AlumnoPagoCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoPagoCuotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoPagoCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
