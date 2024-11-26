import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() task:string ='';
  @Input() description:string ='';
  @Input() date:string ='';
  @Input() status:boolean = false;
}
