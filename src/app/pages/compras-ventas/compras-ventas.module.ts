import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasVentasComponent } from './compras-ventas.component';
import { ComprasVentasService } from './compras-ventas.service';

@NgModule({
  providers: [ComprasVentasService],
  declarations: [ComprasVentasComponent],
  imports: [CommonModule],
})
export class ComprasVentasModule {}
