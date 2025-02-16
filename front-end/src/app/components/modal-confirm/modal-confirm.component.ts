import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css'
})
export class ModalConfirmComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ModalConfirmComponent>) {}

  onConfirm(): void {
    this.dialogRef.close({ confirmed: true }); // Retorna um objeto com a confirmação
  }

  // Método para fechar a modal com o valor de cancelamento
  onCancel(): void {
    this.dialogRef.close({ confirmed: false }); // Retorna um objeto com o cancelamento
  }
  
}
