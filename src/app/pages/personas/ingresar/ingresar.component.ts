import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './ingresar.component.html',
  styles: ``,
})
export class IngresarPersonasComponent {
  public codEmpleado: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  public ingresar(): void {
    this.http
      .get(`http://localhost:3000/empleados/${this.codEmpleado}`)
      .subscribe((data) => {
        console.log(data);
        localStorage.setItem('empleado', JSON.stringify(data));
        this.router.navigate(['/compras-ventas']);
      });
  }
}
