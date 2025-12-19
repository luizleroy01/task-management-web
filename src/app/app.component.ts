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
import AppTesteCardSpaceComponent from './components/teste-card-space/teste-card-space.component';
import { CityMultiSelectComponent } from './components/city-multi-select-component/city-multi-select.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,LoadingComponent,MatDividerModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
