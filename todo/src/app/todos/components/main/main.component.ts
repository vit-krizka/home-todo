import { Component } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { TodoService } from "../../services/todo.service";
import { TodoInterface } from "../../types/todo.interface";
import { map } from "rxjs/operators";
import { FilterEnum } from "../../types/filter.enum";

@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html'
})

export class MainComponent { 
    visibleTodos$: Observable<TodoInterface[]>;
    noTodoClass$: Observable<boolean>;
    isAllTodosSelected$: Observable<boolean>;
    editingId: string | null = null;

    constructor(private todoService : TodoService) {
        this.isAllTodosSelected$ = this.todoService.todos$.pipe(
            map( todos => todos.every(todo =>  todo.isCompleted))
        );

        this.noTodoClass$ = this.todoService.todos$.pipe(
            map( todos => todos.length === 0)
        );

        this.visibleTodos$ = combineLatest(
            todoService.todos$,
            todoService.filter$
        ).pipe(map(([todos, filter] : [TodoInterface[], FilterEnum ]) => {
            if (filter === FilterEnum.active) {
                return todos.filter(todo => !todo.isCompleted);
            } else if (filter === FilterEnum.completed) {
                return todos.filter(todo => todo.isCompleted);
            } else {
                return todos;
            }
        }))
    }

    toggleAllTodos(event: Event): void  {
        const target =  event.target as HTMLInputElement;
        this.todoService.toggleAll(target.checked);
    }

    setEditingId(editingId: string | null): void {
        this.editingId = editingId;
    }
};