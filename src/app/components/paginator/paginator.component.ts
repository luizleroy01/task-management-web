import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() totalPages: number = 0;
  @Input() totalTasks: number = 0;
  @Output() currentTaskPage: EventEmitter<number> = new EventEmitter();
  protected currentPage : number = 0;

  protected nextTaskPage(){
    if(this.currentPage < this.totalPages - 1){
      this.currentPage++;
      this.currentTaskPage.emit(this.currentPage);
    }
  }

  protected beforeTaskPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.currentTaskPage.emit(this.currentPage);
    }
  }
}
