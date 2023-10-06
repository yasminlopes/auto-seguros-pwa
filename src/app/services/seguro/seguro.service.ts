import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from 'src/app/models/seguro-model';
import { OnlineOfflineService } from '../online-offline/online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private _apiSeguros = 'http://localhost:9000';

  constructor(
    private _http: HttpClient,
    private _onlineOfflineService: OnlineOfflineService
  ) { 
    this.ouvirStatusConexao()
  }

  private cadastrarSeguro(seguro: Seguro) {
    return this._http.post(`${this._apiSeguros}/api/seguro`, seguro)
    .subscribe(response => alert('Seguro cadastrado com sucesso!'),
    (error) => console.log('Erro ao cadastrar seguro')
    )
  }

  public listarSeguros(): Observable<Seguro[]> {
    return this._http.get<Seguro[]>(`${this._apiSeguros}/api/seguros`)
  }

  public salvarApi(seguro: Seguro) {
    if (this._onlineOfflineService.isOnline) {
      this.cadastrarSeguro(seguro)
    } else {
      console.log('Salvar seguro no banco local')
    }
  }


  private ouvirStatusConexao(){
    this._onlineOfflineService.statusConexao.subscribe(online => {
      if (online) {
        console.log('enviando os dados do meu banco local para a API')
      } else {
        console.log('estou offline')
      }
    })
  }
}
