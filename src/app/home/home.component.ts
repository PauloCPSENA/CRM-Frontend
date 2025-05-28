/* import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelosComponent } from '../modelos/modelos.component';
import { PropostasComponent } from '../propostas/propostas.component';
import { ClientesComponent } from '../clientes/clientes.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ModelosComponent,
    PropostasComponent,
    ClientesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {} */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}

