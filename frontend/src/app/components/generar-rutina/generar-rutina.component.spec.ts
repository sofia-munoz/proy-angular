import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRutinaComponent } from './generar-rutina.component';

describe('GenerarRutinaComponent', () => {
  let component: GenerarRutinaComponent;
  let fixture: ComponentFixture<GenerarRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRutinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
