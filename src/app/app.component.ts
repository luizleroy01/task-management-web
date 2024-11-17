import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { lastValueFrom } from 'rxjs';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent,CardModule,DividerModule,SplitButtonModule, ToastModule],
  templateUrl: './app.component.html',
  template:`<router-outlet />`,
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
tasks :Task[] = [];
items: MenuItem[];
 constructor(private taskService:TaskService){
  this.items = [
    {
        label: 'Update',
        command: () => {
            this.update();
        }
    },
    {
        label: 'Delete',
        command: () => {
            this.delete();
        }
    },
  ];
 }

 ngOnInit(): void {
     this.getTasks();
 }
  async getTasks(){
    this.tasks = await lastValueFrom(this.taskService.getTasks());
  }

  save(action:string) : void {
    console.log(action);
  }

  update() {
    console.log('update');
  }

delete() {
    console.log('delete');
}
}
