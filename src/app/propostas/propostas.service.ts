import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Proposta {
  id?: number;
  clienteId: number;
  modeloPropostaId: number;
  titulo: string;
  escopoDetalhado: string;
  condicoesExclusao: string;
  obrigacoesContratada: string;
  obrigacoesContratante: string;
  prazoExecucao: string;
  valorTotal: number;
  condicoesPagamento: string;
  dataCriacao?: string;
  validade: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PropostasService {
  private apiUrl = `${environment.apiUrl}/Proposta`;

  constructor(private http: HttpClient) {}

  getPropostas(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(this.apiUrl);
  }

  adicionarProposta(proposta: Proposta): Observable<Proposta> {
    return this.http.post<Proposta>(this.apiUrl, proposta);
  }

  // Você pode adicionar update/delete se quiser futuramente
}
