import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  private trocaConexao$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => this.atualizaStatusConexao());
    window.addEventListener('offline', () => this.atualizaStatusConexao());
  }

  get isOnline() {
    return !!window.navigator.onLine;
  }

  get trocaConexao() {
    return this.trocaConexao$.asObservable();
  }

  atualizaStatusConexao() {
    this.trocaConexao$.next(window.navigator.onLine);
  }
  
}
