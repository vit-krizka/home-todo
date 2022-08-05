import { Component } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { TodoService } from "../../services/todo.service";
import { FilterEnum } from "../../types/filter.enum";

@Component({
    selector: 'app-todos-footer',
    templateUrl: './footer.component.html'
})

export class FooterComponent { 
    noTodosClass$: Observable<boolean>;
    activeCounts$: Observable<number>;
    itemsLeftText$: Observable<string>;
    filter$: Observable<FilterEnum>;
    filterEnum = FilterEnum;

    constructor(private todosService : TodoService) { 
        this.activeCounts$ = this.todosService.todos$.pipe(
            map( todos => todos.filter(todo => !todo.isCompleted).length)
        );

        this.itemsLeftText$ = this.activeCounts$.pipe(
            map((activeCounts) => `item${activeCounts !== 1 ? "s" : ""} left`)
        );

        this.noTodosClass$ = this.todosService.todos$.pipe(
            map( todos => todos.length === 0)
        );

        this.filter$ = this.todosService.filter$;
    }

    changeFilter(event: Event, filterName: FilterEnum) {
        event.preventDefault();
        this.todosService.changeFilter(filterName); 
    }
};