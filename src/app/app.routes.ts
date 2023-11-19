import { Routes } from '@angular/router';
import { ComprasVentasComponent } from './pages/compras-ventas/compras-ventas.component';

export const routes: Routes = [
  {
    path: 'personas',
    loadChildren: () =>
      import('./pages/personas/personas.module').then((m) => m.PersonasModule),
  },
  {
    path: 'compras-ventas',
    component: ComprasVentasComponent,
  },
  { path: '**', redirectTo: 'personas' },
];
