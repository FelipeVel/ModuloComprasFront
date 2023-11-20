import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasVentasComponent } from './compras-ventas.component';
import { ComprasVentasService } from './compras-ventas.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  providers: [ComprasVentasService],
  declarations: [ComprasVentasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule,
    InputNumberModule,
  ],
  exports: [ComprasVentasComponent],
})
export class ComprasVentasModule {}
