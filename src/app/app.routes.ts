

import { Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio/relatorio.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./clientes/clientes.component').then(m => m.ClientesComponent)
  },
  {
    path: 'propostas',
    loadComponent: () =>
      import('./propostas/propostas.component').then(m => m.PropostasComponent)
  },
  {
    path: 'modelos',
    loadComponent: () =>
      import('./modelos/modelos.component').then(m => m.ModelosComponent)
  },
  {
    path: '**',
    redirectTo: ''
  },

  {
  path: 'relatorios/:id',
  loadComponent: () => import('./relatorio/relatorio.component').then(m => m.RelatorioComponent)
}
];








