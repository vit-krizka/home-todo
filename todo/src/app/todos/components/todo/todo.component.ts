import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { TodoInterface } from "../../types/todo.interface";

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit { 
    @Input("todo") todoProps!: TodoInterface;
    @Input("isEditing") isEditingProps!: boolean;
    @Output("setEditingId") setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();
    editingText: string = "";

    constructor(private todosService: TodoService) { }

    ngOnInit(): void {
        this.editingText = this.todoProps.text;
    }

    setTodoInEditMode(): void {
        this.setEditingIdEvent.emit(this.todoProps.id);
    }

    removeTodo(): void {
        this.todosService.removeTodo(this.todoProps.id);
    }

    toggleTodo(): void {
        this.todosService.toggleTodo(this.todoProps.id);
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editingText = value;
    }

    changeTodo(): void  {
        this.todosService.changeTodo(this.todoProps.id, this.editingText); 
        this.setEditingIdEvent.emit(null);
    }
};