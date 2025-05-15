import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'students',
    loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent)
  },
  { 
    path: 'courses',
    loadComponent: () => import('./courses/courses.component').then(m => m.CoursesComponent)
  },
  { 
    path: 'departments',
    loadComponent: () => import('./departments/departments.component').then(m => m.DepartmentsComponent)
  },
  { 
    path: 'books',
    loadComponent: () => import('./books/books.component').then(m => m.BooksComponent)
  },
  { 
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
];