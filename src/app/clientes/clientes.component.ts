import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from './clientes.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClientesService]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteEmEdicao: Cliente | null = null;
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clientesService: ClientesService) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: dados => this.clientes = dados,
      error: err => console.error('Erro ao carregar clientes:', err)
    });
  }

  salvarCliente(): void {
    if (this.clienteForm.invalid) return;

    const cliente = this.clienteForm.value;

    if (this.clienteEmEdicao) {
      const atualizado = { ...this.clienteEmEdicao, ...cliente };

      this.clientesService.atualizarCliente(atualizado).subscribe({
        next: () => {
          const index = this.clientes.findIndex(c => c.id === atualizado.id);
          if (index !== -1) this.clientes[index] = atualizado;
          this.clienteForm.reset();
          this.clienteEmEdicao = null;
        },
        error: err => console.error('Erro ao atualizar cliente:', err)
      });

    } else {
      this.clientesService.adicionarCliente(cliente).subscribe({
        next: novo => {
          this.clientes.push(novo);
          this.clienteForm.reset();
        },
        error: err => console.error('Erro ao adicionar cliente:', err)
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.clienteEmEdicao = cliente;
    this.clienteForm.patchValue(cliente);
  }

  excluirCliente(id: number): void {
    if (!confirm('Deseja realmente excluir este cliente?')) return;

    this.clientesService.deletarCliente(id).subscribe({
      next: () => {
        this.clientes = this.clientes.filter(c => c.id !== id);
        if (this.clienteEmEdicao?.id === id) {
          this.clienteEmEdicao = null;
          this.clienteForm.reset();
        }
      },
      error: err => console.error('Erro ao excluir cliente:', err)
    });
  }

      cancelarEdicao(): void {
      this.clienteEmEdicao = null;
   this.clienteForm.reset();
  }
  limparFormulario(): void {
    this.clienteForm.reset();

  }
}












