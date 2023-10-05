import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MarcaCarro } from 'src/app/models/marca-carro.model';

interface CarqueryApiResponse {
  Makes: Array<any>;
}

@Injectable({
  providedIn: 'root',
})
export class MarcaCarroService {
  private _baseUrl =
    'https://www.carqueryapi.com/api/0.3/?callback=%3F&cmd=getMakes';

  constructor(private _httpClient: HttpClient) {}

  private mapMarcas(marcas: Array<any>): MarcaCarro[] {
    return marcas.map((marca) => ({
      codigo: marca.make_id,
      nome: marca.make_display,
    }));
  }

  public getMarcas(): Observable<MarcaCarro[]> {
    return this._httpClient
      .jsonp<CarqueryApiResponse>(this._baseUrl, 'callback')
      .pipe(
        map((response: CarqueryApiResponse) => this.mapMarcas(response.Makes))
      );
  }
}
