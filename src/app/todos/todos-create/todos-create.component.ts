import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todos-create',
  templateUrl: './todos-create.component.html',
  styleUrls: ['./todos-create.component.css']
})
export class TodosCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  isLoading = false;
  form: FormGroup;

  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(
        null,
        { validators: [Validators.required, Validators.maxLength(40),] }
      ),
      content: new FormControl(
        null,
        { validators: [Validators.required] }
      ),
    });
  }

  onAddTodo() {
    if (this.form.valid) {
      const todo: Todo = {
        id: 'undefined',
        title: this.form.value.title,
        content: this.form.value.content,
      };
      this.isLoading = true;
      this.todosService.addTodo(todo);
      this.form.reset();
    }
  }
}