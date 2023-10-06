import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from 'src/app/models/seguro-model';
import { SeguroService } from 'src/app/services/seguro/seguro.service';

@Component({
  selector: 'app-listar-seguros',
  templateUrl: './listar-seguros.component.html',
  styleUrls: ['./listar-seguros.component.scss']
})
export class ListarSegurosComponent implements OnInit {

  public seguros$: Observable<Seguro[]>

  constructor(
    private seguroService: SeguroService
  ) {}

  ngOnInit() {
    this.seguros$ = this.seguroService.listarSeguros()
  }

}
