import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'educonnect-admin';
  items: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard']
      },
      {
        label: 'Students',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/students']
      },
      {
        label: 'Courses',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/courses']
      },
      {
        label: 'Departments',
        icon: 'pi pi-fw pi-sitemap',
        routerLink: ['/departments']
      },
      {
        label: 'Books',
        icon: 'pi pi-fw pi-bookmark',
        routerLink: ['/books']
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          // Handle logout
          this.router.navigate(['/login']);
        }
      }
    ];
  }
}