import { Component, effect, inject } from '@angular/core';
import { SharedStateService } from '../../services/shared-state.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-componente-b',
  imports:[CommonModule],
  standalone: true,
  template: `
    <div *ngIf="showModal()" class="modal">
      <div class="modal-content">
        <h3>Notificação</h3>
        <p>Ocorreu uma atualização!</p>
        <button (click)="close()">Fechar</button>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      position: fixed; top: 0; left: 0;
      width: 100vw; height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.5);
    }
    .modal-content {
      background: white; padding: 1rem 2rem; border-radius: 8px;
    }
  `]
})
export class ComponenteB {
  private sharedState = inject(SharedStateService);
  showModal = this.sharedState.showModal;

  constructor() {
    // Effect: reage automaticamente a alterações no signal
    effect(() => {
      if (this.showModal()) {
        console.log('Modal aberto automaticamente!');
        // Aqui você pode acionar animações, sons, logs etc.
      }
    });
  }

  close() {
    this.sharedState.closeModal();
  }
}