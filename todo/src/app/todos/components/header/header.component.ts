import { Component } from "@angular/core";
import { TodoService } from "../../services/todo.service";

@Component({
    selector: 'app-todos-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent { 
    text: string = "";

    constructor(private todoService : TodoService) {
        // just for tests:
        // this.todoService.todos$.subscribe(todos => {
        //     console.log("todos:", todos);
        // });
    }

    changeText(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.text = target.value;
    }

    addTodo(): void {
        this.todoService.addTodo(this.text);
        this.text = "";
    }
};