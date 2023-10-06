import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  private statusConexao$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => console.log(this.atualizarStatusConexao()))
    window.addEventListener('offline', () => console.log(this.atualizarStatusConexao()))
   }

   public get isOnline(): boolean {
    return !!window.navigator.onLine;
   }

   public get statusConexao(): Observable<boolean> {
    return this.statusConexao$.asObservable();
   }

   public atualizarStatusConexao() {
    this.statusConexao$.next(this.isOnline)
   }
  
}
