
  import { Component } from '@angular/core';
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
  export class ClientesComponent {
    clientes: Cliente[] = [];
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

    adicionarCliente(): void {
      if (this.clienteForm.invalid) return;

      this.clientesService.adicionarCliente(this.clienteForm.value).subscribe({
        next: novo => {
          this.clientes.push(novo);
          this.clienteForm.reset();
        },
        error: err => console.error('Erro ao adicionar cliente:', err)
      });
    }
  }










