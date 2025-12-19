import { Component, Inject, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TaskService } from '../../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm-form',
  standalone: true,
  imports: [MatDividerModule],
  styleUrl: './confirm-form.component.scss',
  template: `
    <div>
      <h2>{{ title }}</h2>
      <mat-divider></mat-divider>
      <div class="form-actions">
        <button class="button-action b-secondary" (click)="closeModal()">Cancelar</button>
        <button  (click)="confirmAction()">Confirmar</button>
      </div>
      
    </div>
  `
})
export class ConfirmFormComponent {

  @Input() protected title: string = 'A seleção da tarefa <strong>fazer trabalho de compiladores</strong><br> está praticamente concluída';
  

  constructor(private taskService: TaskService,
      private dialogRef: MatDialogRef<ConfirmFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any){
      }

    

    protected closeModal(){
      this.dialogRef.close();
    }

    protected async confirmAction(){
      //const result = lastValueFrom(this.taskService.)
    }

}
