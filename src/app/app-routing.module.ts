import { AuthGuard } from './auth/services/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/auth/login/login.component';
import { TodosCreateComponent } from './todos/todos-create/todos-create.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: TodosCreateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthGuard,
  ]
})
export class AppRoutingModule { }
