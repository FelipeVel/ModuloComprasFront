import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IngresarPersonasComponent } from './ingresar/ingresar.component';
import { CrearPersonaComponent } from './crear/crear.component';

const paths = [
  { path: 'ingresar', component: IngresarPersonasComponent },
  { path: 'crear', component: CrearPersonaComponent },
  { path: '**', redirectTo: 'ingresar' },
];

@NgModule({
  imports: [RouterModule.forChild(paths)],
  exports: [],
  declarations: [],
  providers: [],
})
export class PersonasRoutingModule {}
