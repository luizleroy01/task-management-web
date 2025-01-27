import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() totalPages: number = 10;
  protected currentPage : number = 0;

  protected nextTaskPage(){
    if(this.currentPage < this.totalPages - 1){
      this.currentPage++;
    }
  }

  protected beforeTaskPage(){
    if(this.currentPage > 0){
      this.currentPage--;
    }
  }
}
