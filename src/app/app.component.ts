import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { RequestTaskParams, TaskService } from './services/task.service';
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
import { LoadingComponent } from './components/shared/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,CardComponent,LoadingComponent,PaginatorComponent,MatDividerModule],
  templateUrl: './app.component.html',
  template:`
  <router-outlet />
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
tasks :Task[] = [];
private currentPage :number = 0;
protected totalPages :number = 0;
protected totalElements :number = 0;
private loading = false;

 constructor(private taskService:TaskService, private dialog: MatDialog, private loadingService: LoadingService){}

 ngOnInit(): void {
     this.getTasks();
 }
  async getTasks(){
    this.loadingService.show();
    const params : RequestTaskParams = {
      page: this.currentPage,
      items: 3
    }
   this.taskService.getPageTasks(params).subscribe({
      next: (response) => {
        console.log(response);
        this.tasks = response.tasks;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages
        this.loading = false;
        setTimeout(()=>{
           this.loadingService.hide();
        },1000);
       
      },
      error: (error) => {
        console.error('Error:', error);
        this.tasks = this.taskService.getTasksTest();
        setTimeout(()=>{
          this.loadingService.hide();
       },1000)
      }
    })
    
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
      }
    });
  }

  async createTask(body : Task){
    this.taskService.createTask(body).subscribe({
      next: (data) => {
        console.log('Task created successfully', data);
        this.loading = true;
        this.getTasks();
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
    })
  }

  protected handleCurrentTaskPage(page : number){
    this.currentPage = page;
    this.getTasks();
  }
}
