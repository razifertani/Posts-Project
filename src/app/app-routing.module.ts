import { TodosCreateComponent } from './todos/todos-create/todos-create.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'create', component: TodosCreateComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
