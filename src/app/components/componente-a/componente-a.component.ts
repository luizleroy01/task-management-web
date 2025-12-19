import { Component } from '@angular/core';
import { SharedStateService } from '../../services/shared-state.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-componente-a',
  imports: [CommonModule],
  standalone: true,
  template: `
    <button (click)="onAction()">Executar ação</button>
  `
})
export class ComponenteA {
  constructor(private sharedState: SharedStateService) {}

  onAction() {
    // Realiza alguma lógica e depois sinaliza o outro componente
    this.sharedState.openModal();
  }
}