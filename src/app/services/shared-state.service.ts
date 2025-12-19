import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  // Signal controlando o estado do modal
  private _showModal = signal<boolean>(false);
  showModal = this._showModal.asReadonly();

  // Atualiza o estado do modal
  openModal() {
    this._showModal.set(true);
  }

  closeModal() {
    this._showModal.set(false);
  }
}