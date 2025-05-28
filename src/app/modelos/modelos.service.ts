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
  private readonly apiUrl = `${environment.apiUrl}/modeloProposta`;

  constructor(private http: HttpClient) {}

  getModelos(): Observable<ModeloProposta[]> {
    return this.http.get<ModeloProposta[]>(this.apiUrl);
  }

  criar(modelo: ModeloProposta): Observable<ModeloProposta> {
    return this.http.post<ModeloProposta>(this.apiUrl, modelo);
  }

  atualizarModelo(modelo: ModeloProposta): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${modelo.id}`, modelo);
  }

  deletarModelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


  // Futuro:
  // atualizar(id: number, modelo: ModeloProposta): Observable<ModeloProposta> { ... }
  // excluir(id: number): Observable<void> { ... }


