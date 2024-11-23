import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { lastValueFrom } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  template:`<router-outlet />`,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
tasks :Task[] = [];

 constructor(private taskService:TaskService){}

 ngOnInit(): void {
     this.getTasks();
 }
  async getTasks(){
    this.tasks = await lastValueFrom(this.taskService.getTasks());
  }

  save(action:string) {
    console.log(action);
  }

  update() {
    console.log('update');
  }

  delete() {
    console.log('delete');
  }
}
