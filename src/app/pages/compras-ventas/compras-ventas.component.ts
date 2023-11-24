import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

type Empleado = {
  codigo: string;
  nombre: string;
  apellido: string;
  correo: string;
  cargo: {
    codigo: string;
    nombre: string;
  };
};

type Persona = {
  nombreCompleto: string;
  tipoPersona: string;
  tipoDocumento: string;
  numeroDocumento: string;
};

type PersonaIn = {
  nombre: string;
  apellido: string;
  tipoPersona: string;
  tipoDocumento: string;
  numeroDocumento: string;
};

type Producto = {
  id: string;
  categoria: Categoria;
  nombre: string;
  precio: number;
  stock: number;
};

type Categoria = {
  id: string;
  nombre: string;
};

type Item = {
  producto: Producto;
  cantidad: number;
};
@Component({
  templateUrl: './compras-ventas.component.html',
  styles: ``,
})
export class ComprasVentasComponent implements OnInit {
  public facturaForm: FormGroup;
  public empleado: Empleado | undefined;
  public personasList: Persona[] = [];
  public showPanel: boolean = false;
  public tipoPersona: string = '';
  public tipoFactura: string = '';
  public codigoProducto: number = 0;
  public listasProductos: Producto[][] = [];
  public selectedProducts: Producto[] = [];
  public devolucion: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.facturaForm = this.fb.group({
      persona: [''],
      items: this.fb.array([
        this.fb.group({
          producto: [''],
          cantidad: [0],
        }),
      ]),
    });
    if (typeof window !== 'undefined') {
      this.empleado = JSON.parse(localStorage.getItem('empleado') ?? '{}');
    }
  }

  get items() {
    return this.facturaForm.get('items') as FormArray;
  }

  totalizar() {
    this.items.controls.forEach((item: any, index: number) => {
      item.controls.producto.setValue(this.selectedProducts[index]);
    });
    const newTotal = this.facturaForm.value.items.reduce(
      (sum: number, item: any) => sum + item.producto.precio * item.cantidad,
      0
    );

    alert(`El total de la factura es: ${newTotal}`);
  }

  ngOnInit(): void {
    switch (this.empleado?.cargo.codigo) {
      case '1':
        this.showPanel = true;
        this.tipoPersona = 'PR';
        this.tipoFactura = 'DC';
        this.facturaForm.removeControl('persona');
        this.facturaForm.addControl('numFactura', this.fb.control(''));
        this.devolucion = true;
        break;
      case '3':
        this.showPanel = true;
        this.tipoPersona = 'CL';
        this.tipoFactura = 'DV';
        this.facturaForm.removeControl('persona');
        this.facturaForm.addControl('numFactura', this.fb.control(''));
        this.devolucion = true;
        break;
      case '4':
        this.showPanel = true;
        this.tipoPersona = 'CL';
        this.tipoFactura = 'VE';
        break;
      case '6':
        this.showPanel = true;
        this.tipoPersona = 'PR';
        this.tipoFactura = 'CO';
        break;
      default:
        this.tipoPersona = '';
        break;
    }
    if (this.showPanel) {
      this.http
        .get<PersonaIn[]>(`http://localhost:3000/personas/${this.tipoPersona}`)
        .subscribe((data) => {
          this.personasList = data.map((persona) => {
            return {
              nombreCompleto: `${persona.nombre} ${persona.apellido}`,
              tipoPersona: persona.tipoPersona,
              tipoDocumento: persona.tipoDocumento,
              numeroDocumento: persona.numeroDocumento,
            };
          });
        });
    }
  }

  public buscarProducto(event: any, index: number): void {
    event.preventDefault();
    this.http
      .get<Producto[]>(`http://localhost:3000/productos/${event.target.value}`)
      .subscribe((data) => {
        this.listasProductos[index] = data;
      });
    event.target.value = '';
  }

  public buscarFactura(event: any): void {
    event.preventDefault();
    this.http
      .get<Item[]>(
        `http://localhost:3000/facturas/${this.tipoFactura}/${event.target.value}`
      )
      .subscribe((data) => {
        this.items.clear();
        data.forEach((item) => {
          this.items.push(
            this.fb.group({
              producto: [item.producto],
              cantidad: [0],
            })
          );
          this.listasProductos.push([item.producto]);
          this.selectedProducts.push(item.producto);
        });
        console.log(this.listasProductos);
        console.log(this.selectedProducts);
      });
  }

  public getSeverity(stock: number): string {
    if (stock == 0) {
      return 'warn';
    } else if (stock <= 3) {
      return 'accent';
    } else {
      return 'primary';
    }
  }

  public addItem(): void {
    this.items.push(
      this.fb.group({
        producto: [''],
        cantidad: [0],
      })
    );
  }

  public removeItem(index: number): void {
    if (this.listasProductos[index] && this.listasProductos[index].length > 0) {
      this.listasProductos.splice(index, 1);
      this.selectedProducts.splice(index, 1);
    }
    this.items.removeAt(index);
  }

  submitForm() {
    this.items.controls.forEach((item: any, index: number) => {
      item.controls.producto.setValue(this.selectedProducts[index]);
    });

    const data = {
      ...this.facturaForm.value,
      empleado: this.empleado,
    };
    console.log(data);
    this.http
      .post(`http://localhost:3000/facturas/${this.tipoFactura}`, data)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
