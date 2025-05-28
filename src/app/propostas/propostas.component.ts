/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropostasService, Proposta } from './propostas.service';
import { HttpClientModule } from '@angular/common/http';
import { ClientesService, Cliente } from '../clientes/clientes.service';
import { ModeloPropostaService, ModeloProposta } from '../modelos/modelos.service';


@Component({
  selector: 'app-propostas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ],
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css'],
  providers: [PropostasService, ClientesService, ModeloPropostaService]
})
export class PropostasComponent implements OnInit {
  propostas: Proposta[] = [];
  clientes: Cliente[] = [];
  modelos: ModeloProposta[] = [];
  propostaForm: FormGroup;
  propostaEmEdicao: Proposta | null = null;

  constructor(
    private fb: FormBuilder,
    private propostasService: PropostasService,
    private clientesService: ClientesService,
    private modeloService: ModeloPropostaService
  ) {
    this.propostaForm = this.fb.group({
      clienteId: [0, Validators.required],
      modeloPropostaId: [0, Validators.required],
      titulo: ['', Validators.required],
      escopoDetalhado: [''],
      condicoesExclusao: [''],
      obrigacoesContratada: [''],
      obrigacoesContratante: [''],
      prazoExecucao: [''],
      valorTotal: [0, Validators.required],
      condicoesPagamento: [''],
      validade: ['', Validators.required],
      status: ['Pendente']
    });
  }

  ngOnInit(): void {
    this.carregarPropostas();
    this.carregarClientes();
    this.carregarModelos();
  }

  carregarPropostas(): void {
    this.propostasService.getPropostas().subscribe({
      next: dados => this.propostas = dados,
      error: err => console.error('Erro ao carregar propostas:', err)
    });
  }

  carregarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: dados => this.clientes = dados.sort((a, b) => a.nome.localeCompare(b.nome)),
      error: err => console.error('Erro ao carregar clientes:', err)
    });
  }

  carregarModelos(): void {
  this.modeloService.getModelos().subscribe({
    next: (dados: ModeloProposta[]) => {
      this.modelos = dados.sort((a, b) => a.nome.localeCompare(b.nome));
    },
    error: err => console.error('Erro ao carregar modelos:', err)
  });
}

  salvarProposta(): void {
    if (this.propostaForm.invalid) return;

    const proposta = this.propostaForm.value;

    if (this.propostaEmEdicao) {
      const atualizada = { ...this.propostaEmEdicao, ...proposta };

      this.propostasService.atualizarProposta(atualizada).subscribe({
        next: () => {
          const index = this.propostas.findIndex(p => p.id === atualizada.id);
          if (index !== -1) this.propostas[index] = atualizada;
          this.propostaForm.reset({ status: 'Pendente' });
          this.propostaEmEdicao = null;
        },
        error: err => console.error('Erro ao atualizar proposta:', err)
      });

    } else {
      this.propostasService.adicionarProposta(proposta).subscribe({
        next: nova => {
          this.propostas.push(nova);
          this.propostaForm.reset({ status: 'Pendente' });
        },
        error: err => console.error('Erro ao adicionar proposta:', err)
      });
    }
  }

  editarProposta(proposta: Proposta): void {
    this.propostaEmEdicao = proposta;
    this.propostaForm.patchValue(proposta);
  }

  excluirProposta(id: number): void {
    if (!confirm('Deseja realmente excluir esta proposta?')) return;

    this.propostasService.deletarProposta(id).subscribe({
      next: () => {
        this.propostas = this.propostas.filter(p => p.id !== id);
        if (this.propostaEmEdicao?.id === id) {
          this.cancelarEdicao();
        }
      },
      error: err => console.error('Erro ao excluir proposta:', err)
    });
  }

  cancelarEdicao(): void {
    this.propostaEmEdicao = null;
    this.propostaForm.reset({ status: 'Pendente' });
  }

  limparFormulario(): void {
    this.propostaForm.reset({ status: 'Pendente' });
  }
} */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PropostasService, Proposta } from './propostas.service';
import { ClientesService, Cliente } from '../clientes/clientes.service';
import { ModeloPropostaService, ModeloProposta } from '../modelos/modelos.service';

@Component({
  selector: 'app-propostas',
  standalone: true,
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule // Necessário para usar [routerLink]
  ],
  providers: [PropostasService, ClientesService, ModeloPropostaService]
})
export class PropostasComponent implements OnInit {
  propostas: Proposta[] = [];
  clientes: Cliente[] = [];
  modelos: ModeloProposta[] = [];
  propostaForm: FormGroup;
  propostaEmEdicao: Proposta | null = null;

  constructor(
    private fb: FormBuilder,
    private propostasService: PropostasService,
    private clientesService: ClientesService,
    private modeloService: ModeloPropostaService
  ) {
    this.propostaForm = this.fb.group({
      clienteId: [0, Validators.required],
      modeloPropostaId: [0, Validators.required],
      titulo: ['', Validators.required],
      escopoDetalhado: [''],
      condicoesExclusao: [''],
      obrigacoesContratada: [''],
      obrigacoesContratante: [''],
      prazoExecucao: [''],
      valorTotal: [0, Validators.required],
      condicoesPagamento: [''],
      validade: ['', Validators.required],
      status: ['Pendente']
    });
  }

  ngOnInit(): void {
    this.carregarPropostas();
    this.carregarClientes();
    this.carregarModelos();
  }

  carregarPropostas(): void {
    this.propostasService.getPropostas().subscribe({
      next: dados => this.propostas = dados,
      error: err => console.error('Erro ao carregar propostas:', err)
    });
  }

  carregarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: dados => this.clientes = dados.sort((a, b) => a.nome.localeCompare(b.nome)),
      error: err => console.error('Erro ao carregar clientes:', err)
    });
  }

  carregarModelos(): void {
    this.modeloService.getModelos().subscribe({
      next: dados => this.modelos = dados.sort((a, b) => a.nome.localeCompare(b.nome)),
      error: err => console.error('Erro ao carregar modelos:', err)
    });
  }

  salvarProposta(): void {
    if (this.propostaForm.invalid) return;

    const proposta = this.propostaForm.value;

    if (this.propostaEmEdicao) {
      const atualizada = { ...this.propostaEmEdicao, ...proposta };

      this.propostasService.atualizarProposta(atualizada).subscribe({
        next: () => {
          const index = this.propostas.findIndex(p => p.id === atualizada.id);
          if (index !== -1) this.propostas[index] = atualizada;
          this.propostaForm.reset({ status: 'Pendente' });
          this.propostaEmEdicao = null;
        },
        error: err => console.error('Erro ao atualizar proposta:', err)
      });

    } else {
      this.propostasService.adicionarProposta(proposta).subscribe({
        next: nova => {
          this.propostas.push(nova);
          this.propostaForm.reset({ status: 'Pendente' });
        },
        error: err => console.error('Erro ao adicionar proposta:', err)
      });
    }
  }

  editarProposta(proposta: Proposta): void {
    this.propostaEmEdicao = proposta;
    this.propostaForm.patchValue(proposta);
  }

  excluirProposta(id: number): void {
    if (!confirm('Deseja realmente excluir esta proposta?')) return;

    this.propostasService.deletarProposta(id).subscribe({
      next: () => {
        this.propostas = this.propostas.filter(p => p.id !== id);
        if (this.propostaEmEdicao?.id === id) {
          this.cancelarEdicao();
        }
      },
      error: err => console.error('Erro ao excluir proposta:', err)
    });
  }

  cancelarEdicao(): void {
    this.propostaEmEdicao = null;
    this.propostaForm.reset({ status: 'Pendente' });
  }

  limparFormulario(): void {
    this.propostaForm.reset({ status: 'Pendente' });
  }
}









