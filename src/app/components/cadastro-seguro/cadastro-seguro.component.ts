import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaCarro } from 'src/app/models/marca-carro.model';
import { Seguro } from 'src/app/models/seguro-model';
import { MarcaCarroService } from 'src/app/services/marca-carro/marca-carro.service';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.scss'],
})
export class CadastroSeguroComponent implements OnInit {
  public seguro = new Seguro();
  public marcasCarro$: Observable<MarcaCarro[]>;

  constructor(private marcaCarroService: MarcaCarroService) {}

  ngOnInit(): void {
    this.listarMarcas()
  }

  private listarMarcas() {
    this.marcasCarro$ = this.marcaCarroService.getMarcas()
  }

  public enviarNotificacao() {

  }

  public adicionar() {

  }
}
