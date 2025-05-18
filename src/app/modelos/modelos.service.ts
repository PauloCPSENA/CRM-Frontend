import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ModeloProposta {
  id?: number;
  nome: string;
  escopoDetalhadoPadrao: string;
  condicoesExclusaoPadrao: string;
  obrigacoesContratadaPadrao: string;
  obrigacoesContratantePadrao: string;
  condicoesPagamentoPadrao: string;
}

@Injectable({ providedIn: 'root' })
export class ModeloPropostaService {
  private apiUrl = `${environment.apiUrl}/modelosProposta`;

  constructor(private http: HttpClient) {}

  getModelos(): Observable<ModeloProposta[]> {
    return this.http.get<ModeloProposta[]>(this.apiUrl);
  }

  adicionarModelo(modelo: ModeloProposta): Observable<ModeloProposta> {
    return this.http.post<ModeloProposta>(this.apiUrl, modelo);
  }
}
