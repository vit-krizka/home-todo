import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent } from "src/app/todos/components/todos/todos.component";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodoService } from "./services/todo.service";
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "./components/todo/todo.component";
import { FooterComponent } from "./components/footer/footer.component";

const routes : Routes = [
    {
        path: '',
        component: TodosComponent 
    }
]

@NgModule({
    declarations: [ TodosComponent, HeaderComponent, MainComponent, TodoComponent, FooterComponent ],
    imports: [ CommonModule, RouterModule.forChild(routes) ],
    providers: [ TodoService ]
})

export class TodosModule { }