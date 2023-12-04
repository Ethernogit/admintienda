import { Component } from '@angular/core';

@Component({
  selector: 'app-modalmetales',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left azult">Mi Modal</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="onClose()">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <div class="modal-body textc">
      <p>Contenido de mi modal.</p>
    </div>
  `
})
export class ModalmetalesComponent {
  public onClose(): void {
    // lógica para cerrar el modal
  }
}
