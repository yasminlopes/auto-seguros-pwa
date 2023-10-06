import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaCarro } from 'src/app/models/marca-carro.model';
import { Seguro } from 'src/app/models/seguro-model';
import { MarcaCarroService } from 'src/app/services/marca-carro/marca-carro.service';
import { PushNotificationsService } from 'src/app/services/push-notifications/push-notifications.service';
import { SeguroService } from 'src/app/services/seguro/seguro.service';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.scss'],
})
export class CadastroSeguroComponent implements OnInit {
  public seguro = new Seguro();
  public marcasCarro$: Observable<MarcaCarro[]>;

  constructor(
    private marcaCarroService: MarcaCarroService,
    private seguroService: SeguroService,
    private pushNotificationsService: PushNotificationsService
  ) {}

  ngOnInit(): void {
    this.listarMarcas();
  }

  private listarMarcas() {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

  public enviarNotificacao() {
    this.pushNotificationsService.enviar();
  }

  public adicionar() {
    this.seguro.id = this.seguro.placaCarro;
    this.seguroService.salvarApi(this.seguro)
  }
}
