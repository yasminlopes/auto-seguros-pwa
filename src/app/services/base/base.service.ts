import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from '../online-offline/online-offline.service';

@Injectable({
  providedIn: 'root',
})

export abstract class BaseService<T extends { id: string }>{
  private _db: Dexie;
  private _table: Dexie.Table<T, any>;

  protected _http: HttpClient;
  protected _onlineOfflineService: OnlineOfflineService;

  constructor(
    protected injector: Injector,
    protected nomeTabela: string,
    protected urlApi: string
    ) {
    this._http = injector.get(HttpClient);
    this._onlineOfflineService = injector.get(OnlineOfflineService);

    this.ouvirStatusConexao();
    this.iniciarIndexedDb();
  }

  private iniciarIndexedDb() {
    this._db = new Dexie('db-tabelas');
    this._db.version(1).stores({
      [this.nomeTabela]: 'id',
    });

    this._table = this._db.table(this.nomeTabela);
  }

  private cadastrarTabela(tabela: T) {
    return this._http.post(`${this.urlApi}`, tabela).subscribe(
      (response) => alert('tabela cadastrado com sucesso!'),
      (error) => console.log('Erro ao cadastrar tabela')
    );
  }

  public listarTabelas(): Observable<T[]> {
    return this._http.get<T[]>(`${this.urlApi}`);
  }

  private async salvarIndexedDb(tabela: T) {
    try {
      await this._table.add(tabela);
      const todosTabelas: T[] = await this._table.toArray();
      console.log('tabela foi salvo no IndexedDb', todosTabelas);
      // return todosTabelas;
    } catch (error) {
      console.log('Erro ao incluir tabela no IndexedDb', error);
    }
  }

  private async enviarIndexedDbParaApi() {
    const todosTabelas: T[] = await this._table.toArray();

    for (const tabela of todosTabelas) {
      await this.salvarApi(tabela);
      await this._table.delete(tabela.id);
      console.log(`tabela com o id ${tabela.id} foi excluído do IndexedDb`);
    }
  }

  public async salvarApi(tabela: T) {
    if (this._onlineOfflineService.isOnline) {
      this.cadastrarTabela(tabela);
    } else {
      await this.salvarIndexedDb(tabela);
    }
  }

  private ouvirStatusConexao() {
    this._onlineOfflineService.trocaConexao.subscribe((online) => {
      if (online) {
        this.enviarIndexedDbParaApi();
      } else {
        console.log('estou offline');
      }
    });
  }
}
