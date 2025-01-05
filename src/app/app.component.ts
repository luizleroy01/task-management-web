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

  openDialogCreateTask(): void {
    const dialogRef = this.dialog.open(FormTaskComponent,{
      height: '90%',
      width: '40%',
      position: { top: '100px', right: '0' },
      disableClose: true,
      data:{
        name :'',
        description : '',
        date : '',
        status : false,
        anexos : [],
        editMode:false,
      } 
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      console.log(data);
      if (data !== undefined) {
        this.createTask(data);
        this.getTasks();
      }
    });
  }

  openDialogEditTask(data: Task): void {
    const dialogRef = this.dialog.open(FormTaskComponent,{
      height: '90%',
      width: '45%',
      position: { top: '100px', right: '0' },
      disableClose: true,
      data:{
        name : data.name,
        description : data.description,
        date : data.date,
        status : data.status,
        anexos : [],
        editMode:true
      }  
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      console.log(data);
      if (data !== undefined) {
        this.createTask(data);
        this.getTasks();
      }
    });
  }

  async createTask(body : Task){
    const response = await lastValueFrom(this.taskService.createTask(body));
  }

  //next steps: configure to support reloading data after changes
  /*
  addItem() {
    this.loading = true;
    this.dataService.insertData({ name: this.newItem }).subscribe({
      next: () => {
        this.fetchItems(); // Fetch updated data
      },
      error: (err) => {
        console.error('Error adding item:', err);
        this.loading = false; // Stop loading on error
      },
    });
  }

  fetchItems() {
    this.dataService.fetchData().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching items:', err);
        this.loading = false; // Stop loading on error
      },
    });
  }
  */
}
