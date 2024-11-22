import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-splitbutton',
  standalone: true,
  imports: [],
  templateUrl: './splitbutton.component.html',
  styleUrl: './splitbutton.component.scss'
})
export class SplitbuttonComponent {
  @Input() label: string = '';
}
