import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, InputTextModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

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
  }
}
