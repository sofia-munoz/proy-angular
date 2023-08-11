import { TestBed } from '@angular/core/testing';

import { AnadirRutinaAlumnoService } from './anadir-rutina-alumno.service';

describe('AnadirRutinaAlumnoService', () => {
  let service: AnadirRutinaAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnadirRutinaAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
