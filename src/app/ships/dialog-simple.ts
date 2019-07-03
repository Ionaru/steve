import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web';
import { Component, Inject } from '@angular/core';

@Component({
    templateUrl: 'dialog-simple.html',
})
export class DialogSimple {

    public ship: string;

    constructor(
        public dialogRef: MdcDialogRef<DialogSimple>,
        @Inject(MDC_DIALOG_DATA) data: number,
    ) {
        this.ship = data.toString();
    }

    closeDialog(): void {
        this.dialogRef.close('Pizza');
    }
}
