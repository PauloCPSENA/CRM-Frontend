import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./clientes/clientes.component').then((m) => m.ClientesComponent),
  },
  {
    path: 'modelos',
    loadComponent: () =>
      import('./modelos/modelos.component').then((m) => m.ModelosComponent),
  },
  {
    path: 'propostas',
    loadComponent: () =>
      import('./propostas/propostas.component').then((m) => m.PropostasComponent),
  },
];







