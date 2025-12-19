import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-modal-message',
    imports : [CommonModule],
    standalone:true,
    template: `
    <div class="tw-w-[300px] tw-h-[200px] tw-p-3">
        <p>Mensagem do sistema</p>
        <button (click)="closeModal()">Fechar</button>
    </div>
    `
})
export default class ModalMessageComponent{
    protected dialogRef = inject(MatDialogRef<ModalMessageComponent,boolean>)

    protected closeModal(){
        this.dialogRef.close();
    }
}