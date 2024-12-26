import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { lastValueFrom } from 'rxjs';
import { CardComponent } from './components/card/card.component';
import { TaskActionsComponent } from './components/task-actions/task-actions.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormTaskComponent } from './components/form-task/form-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,CardComponent,TaskActionsComponent],
  templateUrl: './app.component.html',
  template:`<router-outlet />`,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
tasks :Task[] = [];

 constructor(private taskService:TaskService, private dialog: MatDialog){}

 ngOnInit(): void {
     this.getTasks();
 }
  async getTasks(){
    try{
      this.tasks = await lastValueFrom(this.taskService.getTasks());
    }
    catch(error){
      this.tasks = this.taskService.getTasksTest();
    }
    
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

  openDialog(): void {
    const dialogRef = this.dialog.open(FormTaskComponent,{
      height: '90%',
      width: '40%',
      position: { top: '100px', right: '0' }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }
}
