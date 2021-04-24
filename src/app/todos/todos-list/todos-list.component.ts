import { AuthService } from './../../auth/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Todo } from '../models/todo.model';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todosSub: Subscription;
  isLoading = false;
  totalTodos = 10;
  todosPerPage = 20;
  currentPage = 1;
  pageSizeOptions = [2, 5, 20, 50];

  isAuthenticated = false;
  private authStatusSubscription: Subscription;

  userId: string | null;

  constructor(
    public todosService: TodosService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.todosService.getTodos(this.todosPerPage, this.currentPage);
    this.todosSub = this.todosService.getTodoUpdateListener()
      .subscribe((todos: { todos: Todo[], todosLength: number }) => {
        this.isLoading = false;
        this.todos = todos.todos;
        this.totalTodos = todos.todosLength;
      });
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(
      value => {
        this.isAuthenticated = value;
        this.userId = this.authService.getUserId();
      }
    );
  }

  onDelete(id: string | null) {
    this.isLoading = true;
    if (id) {
      this.todosService.deleteTodo(id)
        .subscribe(() => {
          this.todosService.getTodos(this.todosPerPage, this.currentPage);
        }, () => {
          this.isLoading = false;
        });
    }
  }

  onChangedPage(pageEvent: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.todosPerPage = pageEvent.pageSize;
    this.todosService.getTodos(this.todosPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }
}
