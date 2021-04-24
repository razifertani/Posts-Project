import { AuthService } from './../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../models/todo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos-create',
  templateUrl: './todos-create.component.html',
  styleUrls: ['./todos-create.component.css']
})
export class TodosCreateComponent implements OnInit, OnDestroy {
  enteredTitle: string = '';
  enteredContent: string = '';
  isLoading = false;
  form: FormGroup;
  private authStatusSub: Subscription;

  constructor(
    public todosService: TodosService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
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
        id: null,
        creator: null,
        title: this.form.value.title,
        content: this.form.value.content,
      };
      this.isLoading = true;
      this.todosService.addTodo(todo);
      this.form.reset();
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}