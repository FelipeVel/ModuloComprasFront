import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './ingresar.component.html',
  styles: ``,
})
export class IngresarPersonasComponent {
  public documento: string = '';

  public ingresar(): void {
    console.log(this.documento);
  }
}
