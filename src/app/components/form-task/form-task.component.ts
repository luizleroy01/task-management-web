import { Component, Inject, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatDividerModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTaskComponent implements OnInit{
  isEditMode = false;
  enableEdit = false;
  formattedDate = '';
  taskForm = new UntypedFormGroup({
    name: new UntypedFormControl('',Validators.required),
    description: new UntypedFormControl('', Validators.required),
    date: new UntypedFormControl('', Validators.required),
    status: new UntypedFormControl(false),
    anexos: new UntypedFormControl([])
  });

  constructor(private taskService: TaskService,
    private dialogRef: MatDialogRef<FormTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  ngOnInit(): void {
    if(this.data){
      this.fillTaskFormData(this.data);
    }
    this.isEditMode = this.data.editMode;
    if(this.isEditMode){
      this.taskForm.disable();
    }
  }

  confirm(){
    console.log("confirmar ação")
    if(this.taskForm.valid){
      const data = this.taskForm.getRawValue();

      const taskBody:Task = {
        name : data.name,
        date : data.date,
        description : data.description,
        status : data.status,
        anexos : data.anexos
      }
       this.data = taskBody;
       this.dialogRef.close(this.data);
    }
    
  }

  close(){
    this.dialogRef.close(true);
  }

  fillTaskFormData(task:Task){
    this.formattedDate = this.formatDate(task.date);
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      date: this.formattedDate,
      status: task.status,
      anexos: task.anexos
    });
  }

  formatDate(date: string):string{
    const dateParts = date.split("/");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  enableEditMode(){
    this.enableEdit = true;
    this.taskForm.enable();
  }

}
