import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TodosService {
    private todos: Todo[] = [];
    private todosUpdated = new Subject<{ todos: Todo[], todosLength: number }>();

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) { }

    getTodos(todoSize: number, currentPage: number) {
        const queryParams = "?pagesize=" + todoSize + "&currentpage=" + currentPage;
        this.httpClient.get<any>('http://127.0.0.1:3000/api/todos' + queryParams)
            .pipe(map((data) => {
                return {
                    todosLength: data.todosLength,
                    todos: data.todos.map((todo: any) => {
                        return {
                            id: todo._id,
                            title: todo.title,
                            content: todo.content,
                        }
                    }),
                }
            }))
            .subscribe((data) => {
                this.todos = data.todos;
                this.todosUpdated.next({
                    todosLength: data.todosLength,
                    todos: [...this.todos],
                });
            });
    }

    getTodoUpdateListener() {
        return this.todosUpdated.asObservable();
    }

    addTodo(todo: Todo) {
        this.httpClient.post<any>('http://127.0.0.1:3000/api/todos', todo)
            .subscribe((data) => {
            });
        this.router.navigate(['/']);
    }

    deleteTodo(id: string) {
        return this.httpClient.delete<any>('http://127.0.0.1:3000/api/todos/' + id)

    }
}