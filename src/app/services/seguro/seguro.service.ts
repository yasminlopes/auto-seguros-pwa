import { Injectable, Injector } from '@angular/core';
import { Seguro } from 'src/app/models/seguro-model';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class SeguroService extends BaseService<Seguro> {

  constructor(protected override injector: Injector) {
    super(injector, 'seguros', 'http://localhost:9000/api/seguros');
  }
}
