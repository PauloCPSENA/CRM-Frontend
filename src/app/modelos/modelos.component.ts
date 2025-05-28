import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModeloProposta, ModeloPropostaService } from './modelos.service';

@Component({
  selector: 'app-modelos',
  standalone: true,
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ModeloPropostaService]
})
export class ModelosComponent implements OnInit {
  modeloForm: FormGroup;
  modelos: ModeloProposta[] = [];
  modeloEmEdicao: ModeloProposta | null = null;

  constructor(
    private fb: FormBuilder,
    private modeloService: ModeloPropostaService
  ) {
    this.modeloForm = this.fb.group({
      nome: ['', Validators.required],
      escopoDetalhadoPadrao: [''],
      condicoesExclusaoPadrao: [''],
      obrigacoesContratadaPadrao: [''],
      obrigacoesContratantePadrao: [''],
      condicoesPagamentoPadrao: ['']
    });
  }

  ngOnInit(): void {
    this.carregarModelos();
  }

  carregarModelos(): void {
    this.modeloService.getModelos().subscribe({
      next: dados => this.modelos = dados.sort((a, b) => a.nome.localeCompare(b.nome)),
      error: err => console.error('Erro ao carregar modelos:', err)
    });
  }

  salvarModelo(): void {
    if (this.modeloForm.invalid) return;

    const modelo = this.modeloForm.value;

    if (this.modeloEmEdicao) {
      const atualizado = { ...this.modeloEmEdicao, ...modelo };
      this.modeloService.atualizarModelo(atualizado).subscribe({
        next: () => {
          const index = this.modelos.findIndex(m => m.id === atualizado.id);
          if (index !== -1) this.modelos[index] = atualizado;
          this.cancelarEdicao();
        },
        error: err => console.error('Erro ao atualizar modelo:', err)
      });
    } else {
      this.modeloService.criar(modelo).subscribe({
        next: novo => {
          this.modelos.push(novo);
          this.modeloForm.reset();
        },
        error: err => console.error('Erro ao adicionar modelo:', err)
      });
    }
  }

  editarModelo(modelo: ModeloProposta): void {
    this.modeloEmEdicao = modelo;
    this.modeloForm.patchValue(modelo);
  }

  excluirModelo(id: number): void {
    if (!confirm('Deseja realmente excluir este modelo?')) return;

    this.modeloService.deletarModelo(id).subscribe({
      next: () => {
        this.modelos = this.modelos.filter(m => m.id !== id);
        if (this.modeloEmEdicao?.id === id) this.cancelarEdicao();
      },
      error: err => console.error('Erro ao excluir modelo:', err)
    });
  }

  cancelarEdicao(): void {
    this.modeloEmEdicao = null;
    this.modeloForm.reset();
  }
}









