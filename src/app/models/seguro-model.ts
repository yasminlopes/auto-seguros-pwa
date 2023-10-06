import { MarcaCarro } from './marca-carro.model';

export class Seguro {
  id: string;
  marcaCarro: MarcaCarro;
  modeloCarro: string;
  placaCarro: string;
  nomeProprietario: string;
  sobrenomeProprietario: string;
  dataNascimentoProprietario: string;
}
