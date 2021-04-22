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
  todosSub: Subscription | undefined;
  isLoading = false;
  totalTodos = 10;
  todosPerPage = 20;
  currentPage = 1;
  pageSizeOptions = [2, 5, 20, 50];

  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.todosService.getTodos(this.todosPerPage, this.currentPage);
    this.todosSub = this.todosService.getTodoUpdateListener()
      .subscribe((todos: { todos: Todo[], todosLength: number }) => {
        this.isLoading = false;
        this.todos = todos.todos;
        this.totalTodos = todos.todosLength;
      });
  }

  ngOnDestroy(): void {
    this.todosSub?.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.todosService.deleteTodo(id)
      .subscribe(() => {
        this.todosService.getTodos(this.todosPerPage, this.currentPage);
      });
  }

  onChangedPage(pageEvent: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.todosPerPage = pageEvent.pageSize;
    this.todosService.getTodos(this.todosPerPage, this.currentPage);
  }


}
