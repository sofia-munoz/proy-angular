import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlumnosFormComponent } from './registro-alumnos-form.component';

describe('RegistroAlumnosFormComponent', () => {
  let component: RegistroAlumnosFormComponent;
  let fixture: ComponentFixture<RegistroAlumnosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAlumnosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAlumnosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
