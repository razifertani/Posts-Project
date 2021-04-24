import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { TodosCreateComponent } from './todos-create/todos-create.component';
import { TodosListComponent } from './todos-list/todos-list.component';

@NgModule({
    declarations: [
        TodosCreateComponent,
        TodosListComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule,
    ],
})
export class TodosModule { }