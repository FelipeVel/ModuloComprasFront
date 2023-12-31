import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ComprasVentasModule } from './pages/compras-ventas/compras-ventas.module';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenubarModule,
    InputTextModule,
    ComprasVentasModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;
  isLogged: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Añadir personas',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/personas/crear',
      },
      {
        label: 'Compras y ventas',
        icon: 'pi pi-fw pi-money-bill',
        routerLink: '/compras-ventas',
      },
    ];
    if (typeof window !== 'undefined') {
      this.isLogged = localStorage.getItem('empleado') !== null;
    }
  }

  salir(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('empleado');
    }
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}
