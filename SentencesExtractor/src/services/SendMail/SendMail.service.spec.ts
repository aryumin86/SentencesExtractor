/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendMailService } from './SendMail.service';

describe('Service: SendMail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendMailService]
    });
  });

  it('should ...', inject([SendMailService], (service: SendMailService) => {
    expect(service).toBeTruthy();
  }));
});
