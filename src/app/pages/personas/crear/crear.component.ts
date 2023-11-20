import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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

@Component({
  templateUrl: './crear.component.html',
  styles: ``,
})
export class CrearPersonaComponent implements OnInit {
  nomenclaturas: Nomenclatura[] | undefined;
  tiposPersona: TipoPersona[] | undefined;
  tiposDocumento: TipoDocumento[] | undefined;
  tiposContacto: TipoContacto[] | undefined;
  personaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.personaForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      tipoPersona: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
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
    });
  }
}
