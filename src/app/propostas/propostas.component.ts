import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropostasService, Proposta } from './propostas.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-propostas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css'],
  providers: [PropostasService]
})
export class PropostasComponent implements OnInit {
  propostas: Proposta[] = [];
  propostaForm: FormGroup;

  constructor(private fb: FormBuilder, private propostasService: PropostasService) {
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
  }

  carregarPropostas(): void {
    this.propostasService.getPropostas().subscribe({
      next: dados => this.propostas = dados,
      error: err => console.error('Erro ao carregar propostas:', err)
    });
  }

  adicionarProposta(): void {
    if (this.propostaForm.invalid) return;

    this.propostasService.adicionarProposta(this.propostaForm.value).subscribe({
      next: nova => {
        this.propostas.push(nova);
        this.propostaForm.reset({ status: 'Pendente' }); // reinicializa status
      },
      error: err => console.error('Erro ao adicionar proposta:', err)
    });
  }
}






/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropostasService, Proposta } from './propostas.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-propostas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css'],
  providers: [PropostasService]
})
export class PropostasComponent implements OnInit {
  propostaForm!: FormGroup;
  propostas: Proposta[] = [];

  constructor(private fb: FormBuilder, private propostasService: PropostasService) {}

  ngOnInit(): void {
    this.propostaForm = this.fb.group({
      clienteId: ['', Validators.required],
      modeloPropostaId: ['', Validators.required],
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

    this.carregarPropostas();
  }

  carregarPropostas(): void {
    this.propostasService.getPropostas().subscribe({
      next: dados => this.propostas = dados,
      error: err => console.error('Erro ao carregar propostas:', err)
    });
  }

  adicionarProposta(): void {
    if (this.propostaForm.invalid) return;

    const novaProposta = {
      ...this.propostaForm.value,
      dataCriacao: new Date().toISOString()
    };

    this.propostasService.adicionarProposta(novaProposta).subscribe({
      next: proposta => {
        this.propostas.push(proposta);
        this.propostaForm.reset();
      },
      error: err => console.error('Erro ao adicionar proposta:', err)
    });
  }
}




/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propostas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css']
})
export class PropostasComponent {}*/


