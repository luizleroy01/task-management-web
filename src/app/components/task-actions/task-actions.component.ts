import { CommonModule } from '@angular/common';
import { Component,ChangeDetectionStrategy } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-task-actions',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './task-actions.component.html',
  styleUrl: './task-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskActionsComponent {

}
