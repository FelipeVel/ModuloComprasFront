import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './ingresar.component.html',
  styles: ``,
})
export class IngresarPersonasComponent {
  public ingresoForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.ingresoForm = this.fb.group({
      codEmpleado: ['', [Validators.required]],
    });
  }

  public ingresar(): void {
    this.http
      .get(
        `http://localhost:3000/empleados/${this.ingresoForm.value.codEmpleado}`
      )
      .subscribe((data) => {
        localStorage.setItem('empleado', JSON.stringify(data));
        this.router.navigate(['/compras-ventas']);
      });
  }
}
