import { AuthGuard } from './auth/services/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosCreateComponent } from './todos/todos-create/todos-create.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';

const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'create', component: TodosCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
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
