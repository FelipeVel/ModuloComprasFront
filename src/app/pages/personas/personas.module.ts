import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearPersonaComponent } from './crear/crear.component';
import { IngresarPersonasComponent } from './ingresar/ingresar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PersonasRoutingModule } from './personas.routing.module';

@NgModule({
  declarations: [CrearPersonaComponent, IngresarPersonasComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DividerModule,
    ButtonModule,
    CheckboxModule,
    PersonasRoutingModule,
  ],
  exports: [CrearPersonaComponent, IngresarPersonasComponent],
})
export class PersonasModule {}
