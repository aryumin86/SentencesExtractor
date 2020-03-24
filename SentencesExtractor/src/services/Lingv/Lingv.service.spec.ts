/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LingvService } from './Lingv.service';

describe('Service: Lingv', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LingvService]
    });
  });

  it('should ...', inject([LingvService], (service: LingvService) => {
    expect(service).toBeTruthy();
  }));
});
