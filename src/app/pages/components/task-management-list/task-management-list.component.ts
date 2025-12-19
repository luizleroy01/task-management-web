import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CardComponent } from "../../../components/card/card.component";
import { PaginatorComponent } from "../../../components/paginator/paginator.component";
import { MatDividerModule } from "@angular/material/divider";
import { RequestTaskParams, TaskService } from "../../../services/task.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingService } from "../../../services/loading.service";
import { FormTaskComponent } from "../../../components/form-task/form-task.component";
import { Task } from "../../../models/task.model";
import { CityMultiSelectComponent } from "../../../components/city-multi-select-component/city-multi-select.component";

@Component({
    selector: 'page-task-management-list',
    standalone:true,
    imports: [CommonModule, CardComponent, PaginatorComponent, MatDividerModule, CityMultiSelectComponent],
    styleUrl: './task-management-list.component.scss',
    template: `
        <h1 class="text-3xl font-bold underline bg-red-600">
          Hello world!
        </h1>
        <button mat-button class="bt-new-task" (click)="applyEditMode()">Editar</button>
        <app-city-multi-select
        [cities]="['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Porto Alegre', 'Salvador']"
        [disabled]="isEditMode">
        </app-city-multi-select>
        <div class="container">
        <button mat-button class="bt-new-task" (click)="openDialogCreateTask()">Nova tarefa</button>
            @for (item of tasks; track $index) {
                <a (click)="openDialogEditTask(item)">
                <app-card
                [task]="item.name"
                [description]="item.description"
                [date]="item.date"
                [status]="item.status"
                [attachments]="item.anexos.length"
                />
                </a>
            }
            <mat-divider></mat-divider>
            <footer>
                <app-paginator 
                (currentTaskPage)="handleCurrentTaskPage($event)"
                [totalTasks]="totalElements"
                [totalPages]="totalPages"
                >
                </app-paginator>
            </footer>
        </div>
    `
})
export default class TaskManagementList{
    tasks :Task[] = [];
private currentPage :number = 0;
protected totalPages :number = 0;
protected totalElements :number = 0;
private loading = false;
protected isEditMode = false;

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
        },500);
       
      },
      error: (error) => {
        console.error('Error:', error);
        this.tasks = this.taskService.getTasksTest();
        setTimeout(()=>{
          this.loadingService.hide();
       },500)
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

  protected applyEditMode(){
    this.isEditMode = !this.isEditMode;
  }
}