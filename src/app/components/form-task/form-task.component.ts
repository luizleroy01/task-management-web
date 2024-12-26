import { Component, Inject } from '@angular/core';
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
export class FormTaskComponent {
  taskForm = new UntypedFormGroup({
    name: new UntypedFormControl('',Validators.required),
    description: new UntypedFormControl('', Validators.required),
    date: new UntypedFormControl('', Validators.required),
    status: new UntypedFormControl(false),
    anexos: new UntypedFormControl([])
  });

  constructor(private taskService: TaskService,
    private dialogRef: MatDialogRef<FormTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ){}

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

}
