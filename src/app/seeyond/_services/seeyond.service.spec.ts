/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeeyondService } from './seeyond.service';

describe('SeeyondService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeeyondService]
    });
  });

  it('should ...', inject([SeeyondService], (service: SeeyondService) => {
    expect(service).toBeTruthy();
  }));
});
