import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Nomenclatura {
  id: number;
  posicion: number;
  descripcion: string;
  abreviatura: string;
}

interface TipoPersona {
  id: number;
  nombre: string;
}

interface TipoDocumento {
  valor: number;
  nombre: string;
}

interface TipoContacto {
  nombre: string;
  valor: string;
}

interface CompDireccion {
  posicion: number;
  descripcion: string;
  obligatoriedad: number;
}

type Diccionario = {
  [key: string]: string;
};

const componenteDict: Diccionario = {
  'TIPO VIA': 'tipoVia',
  'NUMERO VIA PRINCIPAL': 'viaPrincipal',
  'LETRA VIA PRINCIPAL': 'letraVia',
  'PREFIJO BIS': 'prefijo',
  'LETRA PREFIJO': 'letraPrefijo',
  CUADRANTE: 'cuadrante',
  'NUMERO VIA GENERADORA': 'viaGeneradora',
  'LETRA VIA GENERADORA': 'letraViaGeneradora',
  'SUFIJO BIS': 'sufijo',
  'LETRA SUFIJO': 'letraSufijo',
  'NUMERO PLACA': 'placa',
  'CUADRANTE PLACA': 'cuadrantePlaca',
  BARRIO: 'barrio',
  'NOMBRE BARRIO': 'nombreBarrio',
  MANZANA: 'manzana',
  'IDENTIFICADOR MANZANA': 'numeroManzana',
  URBANIZACION: 'urbanizacion',
  'NOMBRE URBANIZACION': 'nombreUrbanizacion',
  'TIPO PREDIO': 'tipoPredio',
  'IDENTIFICADOR PREDIO': 'identificadorPredio',
  COMPLEMENTO: 'complemento',
};

@Component({
  templateUrl: './crear.component.html',
  styles: ``,
})
export class CrearPersonaComponent implements OnInit {
  nomenclaturas: Nomenclatura[] | undefined;
  tiposPersona: TipoPersona[] | undefined;
  tiposDocumento: TipoDocumento[] | undefined;
  tiposContacto: TipoContacto[] | undefined;
  compDirecciones: CompDireccion[] | undefined;
  personaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      direcciones: this.fb.array([
        this.fb.group({
          tipoVia: [''],
          viaPrincipal: [''],
          letraVia: [''],
          prefijo: [[]],
          letraPrefijo: [''],
          cuadrante: [''],
          viaGeneradora: [''],
          letraViaGeneradora: [''],
          sufijo: [[]],
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
          descContacto: ['', Validators.required],
          tipoContacto: ['', Validators.required],
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
        descContacto: ['', Validators.required],
        tipoContacto: ['', Validators.required],
      })
    );
  }

  addDireccion() {
    this.direcciones.push(
      this.fb.group({
        tipoVia: [''],
        viaPrincipal: [''],
        letraVia: [''],
        prefijo: [[]],
        letraPrefijo: [''],
        cuadrante: [''],
        viaGeneradora: [''],
        letraViaGeneradora: [''],
        sufijo: [[]],
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
    this.compDirecciones!.forEach((element) => {
      if (element.obligatoriedad === 1) {
        this.direcciones.controls.forEach((control) => {
          control
            .get(componenteDict[element.descripcion])
            ?.setValidators([Validators.required]);
        });
      }
    });
  }

  removeContacto(i: number) {
    this.contactos.removeAt(i);
  }

  removeDireccion(i: number) {
    this.direcciones.removeAt(i);
  }

  ngOnInit() {
    this.http
      .get<Nomenclatura[]>('http://localhost:3000/nomenclaturas')
      .subscribe((data) => {
        this.nomenclaturas = data;
      });

    this.http
      .get<TipoPersona[]>('http://localhost:3000/personas/tipos')
      .subscribe((data) => {
        this.tiposPersona = data;
      });

    this.http
      .get<TipoDocumento[]>('http://localhost:3000/documentos/tipos')
      .subscribe((data) => {
        this.tiposDocumento = data;
      });

    this.http
      .get<TipoContacto[]>('http://localhost:3000/contactos/tipos')
      .subscribe((data) => {
        this.tiposContacto = data;
      });
    this.http
      .get<CompDireccion[]>('http://localhost:3000/direcciones')
      .subscribe((data) => {
        this.compDirecciones = data;
        this.compDirecciones.forEach((element) => {
          if (element.obligatoriedad === 1) {
            this.direcciones.controls.forEach((control) => {
              control
                .get(componenteDict[element.descripcion])
                ?.setValidators([Validators.required]);
            });
          }
        });
      });
  }

  public nomenclaturaPos(posicion: number) {
    return this.nomenclaturas?.filter((n) => n.posicion === posicion);
  }

  onSubmit() {
    const data = this.personaForm.value;
    data.direcciones.forEach((element: any) => {
      if (element.prefijo.length > 0) {
        element.prefijo = element.prefijo[0];
      } else {
        element.prefijo = '';
      }
      if (element.sufijo.length > 0) {
        element.sufijo = element.sufijo[0];
      } else {
        element.sufijo = '';
      }
    });
    console.log(data);
    this.http.post('http://localhost:3000/personas', data).subscribe((data) => {
      console.log(data);
      this.personaForm.reset();
    });
  }
}
