import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from 'src/app/models/seguro-model';
import { OnlineOfflineService } from '../online-offline/online-offline.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private _apiSeguros = 'http://localhost:9000';
  private _db: Dexie
  private _table: Dexie.Table<Seguro, any>

  constructor(
    private _http: HttpClient,
    private _onlineOfflineService: OnlineOfflineService
  ) { 
    this.ouvirStatusConexao()
    this.iniciarIndexedDb()
  }

  private iniciarIndexedDb() {
    this._db = new Dexie('db-seguros')
    this._db.version(1).stores({
      seguro: 'id'
    });

    this._table = this._db.table('seguro')
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

  private async salvarIndexedDb(seguro: Seguro) {
    try {
      await this._table.add(seguro)
      const todosSeguros: Seguro[] = await this._table.toArray()
      console.log('Seguro foi salvo no IndexedDb', todosSeguros)
      // return todosSeguros;
    } catch (error) {
      console.log('Erro ao incluir seguro no IndexedDb', error)      
    }
  }

  private async enviarIndexedDbParaApi() {
    const todosSeguros: Seguro[] = await this._table.toArray()

    for (const seguro of todosSeguros) {
      await this.salvarApi(seguro);
      await this._table.delete(seguro.id);
      console.log(`Seguro com o id ${seguro.id} foi excluído do IndexedDb`)
    }
  }

  public async salvarApi(seguro: Seguro) {
    if (this._onlineOfflineService.isOnline) {
      this.cadastrarSeguro(seguro)
    } else {
      await this.salvarIndexedDb(seguro)
    }
  }

  private ouvirStatusConexao(){
    this._onlineOfflineService.statusConexao.subscribe(online => {
      if (online) {
        this.enviarIndexedDbParaApi()
      } else {
        console.log('estou offline')
      }
    })
  }
}
