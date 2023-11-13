import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

interface Via {
  elemento: string;
  abreviatura: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DividerModule,
    ButtonModule,
    CheckboxModule,
  ],
  templateUrl: './crear.component.html',
  styles: ``,
})
export class CrearComponent {
  tiposVia: Via[] | undefined;

  personaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personaForm = this.fb.group({
      nombre: [''],
      tipoPersona: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      direcciones: this.fb.array([
        this.fb.group({
          tipoVia: [''],
          viaPrincipal: [''],
          letraVia: [''],
          prefijo: [''],
          letraPrefijo: [''],
          cuadrante: [''],
          viaGeneradora: [''],
          letraViaGeneradora: [''],
          sufijo: [''],
          letraSufijo: [''],
          placa: [''],
          cuadrantePlaca: [''],
          barrio: [''],
          nombreBarrio: [''],
          manzana: [''],
          numeroManzana: [''],
          urbanizacion: [''],
          nombreUrbanizacion: [''],
          tipoPredio: [''],
          identificadorPredio: [''],
          complemento: [''],
        }),
      ]),
      contactos: this.fb.array([
        this.fb.group({
          descContacto: [''],
          tipoContacto: [''],
        }),
      ]),
    });
  }

  get contactos() {
    return this.personaForm.get('contactos') as FormArray;
  }

  get direcciones() {
    return this.personaForm.get('direcciones') as FormArray;
  }

  addContacto() {
    this.contactos.push(
      this.fb.group({
        descContacto: [''],
        tipoContacto: [''],
      })
    );
  }

  addDireccion() {
    this.direcciones.push(
      this.fb.group({
        tipoVia: [''],
        viaPrincipal: [''],
        letraVia: [''],
        prefijo: [''],
        letraPrefijo: [''],
        cuadrante: [''],
        viaGeneradora: [''],
        letraViaGeneradora: [''],
        sufijo: [''],
        letraSufijo: [''],
        placa: [''],
        cuadrantePlaca: [''],
        barrio: [''],
        nombreBarrio: [''],
        manzana: [''],
        numeroManzana: [''],
        urbanizacion: [''],
        nombreUrbanizacion: [''],
        tipoPredio: [''],
        identificadorPredio: [''],
        complemento: [''],
      })
    );
  }

  removeContacto(i: number) {
    this.contactos.removeAt(i);
  }

  removeDireccion(i: number) {
    this.direcciones.removeAt(i);
  }

  ngOnInit() {
    this.tiposVia = [
      {
        elemento: 'Autopista',
        abreviatura: 'AU',
      },
      {
        elemento: 'Avenida',
        abreviatura: 'AV',
      },
      {
        elemento: 'Avenida Calle',
        abreviatura: 'AC',
      },
      {
        elemento: 'Avenida Carrera',
        abreviatura: 'AK',
      },
      {
        elemento: 'Bulevar',
        abreviatura: 'BL',
      },
      {
        elemento: 'Calle',
        abreviatura: 'CL',
      },
      {
        elemento: 'Carrera',
        abreviatura: 'KR',
      },
      {
        elemento: 'Carretera',
        abreviatura: 'CT',
      },
      {
        elemento: 'Circular',
        abreviatura: 'CQ',
      },
      {
        elemento: 'Circunvalar',
        abreviatura: 'CV',
      },
      {
        elemento: 'Cuentas corridas',
        abreviatura: 'CC',
      },
      {
        elemento: 'Diagonal',
        abreviatura: 'DG',
      },
      {
        elemento: 'Pasaje',
        abreviatura: 'PJ',
      },
      {
        elemento: 'Paseo',
        abreviatura: 'PS',
      },
      {
        elemento: 'Peatonal',
        abreviatura: 'PT',
      },
      {
        elemento: 'Transversal',
        abreviatura: 'TV',
      },
      {
        elemento: 'Troncal',
        abreviatura: 'TC',
      },
      {
        elemento: 'Variante',
        abreviatura: 'VT',
      },
      {
        elemento: 'Via',
        abreviatura: 'VI',
      },
    ];
  }

  onSubmit() {
    console.log(this.personaForm.value);
  }
}
