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
        this.httpClient.get<any>("https://todos--project.herokuapp.com/api/todos"/* + queryParams */)
            .pipe(map((data) => {
                return {
                    todosLength: data.todosLength,
                    todos: data.todos.map((todo: any) => {
                        return {
                            id: todo._id,
                            creator: todo.creator,
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
        this.httpClient.post<any>("https://todos--project.herokuapp.com/api/todos", todo)
            .subscribe((data) => {
                this.router.navigate(['/']);
            });
    }

    deleteTodo(id: string) {
        return this.httpClient.get<any>("https://todos--project.herokuapp.com/api/todos" + id)

    }
}