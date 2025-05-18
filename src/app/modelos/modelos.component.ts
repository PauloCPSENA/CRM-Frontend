import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModeloProposta, ModeloPropostaService } from './modelos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  modeloForm!: FormGroup;
  modelos: ModeloProposta[] = [];

  constructor(
    private fb: FormBuilder,
    private modeloService: ModeloPropostaService
  ) {}

  ngOnInit(): void {
    this.modeloForm = this.fb.group({
      nome: ['', Validators.required],
      escopoDetalhadoPadrao: [''],
      condicoesExclusaoPadrao: [''],
      obrigacoesContratadaPadrao: [''],
      obrigacoesContratantePadrao: [''],
      condicoesPagamentoPadrao: ['']
    });

    this.carregarModelos();
  }

  carregarModelos(): void {
    this.modeloService.getModelos().subscribe({
      next: data => this.modelos = data,
      error: err => console.error('Erro ao carregar modelos:', err)
    });
  }

  adicionarModelo(): void {
    if (this.modeloForm.invalid) return;

    this.modeloService.adicionarModelo(this.modeloForm.value).subscribe({
      next: novo => {
        this.modelos.push(novo);
        this.modeloForm.reset();
      },
      error: err => console.error('Erro ao adicionar modelo:', err)
    });
  }
}





/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent {}*/

