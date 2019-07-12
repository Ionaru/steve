import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { faCircleNotch, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { EVE, IUniverseNamesData, IUniverseNamesDataUnit } from '@ionaru/eve-utils';

@Component({
    templateUrl: 'dialog-simple.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogSimple implements OnInit {

    public ship: IUniverseNamesDataUnit;
    // public shipId: number;

    public done = false;
    public loadingIcon = faCircleNotch;
    public closeIcon = faTimes;

    constructor(
        private readonly http: HttpClient,
        private readonly dialogRef: MdcDialogRef<DialogSimple>,
        @Inject(MDC_DIALOG_DATA) public data: number,
    ) { }

    public async ngOnInit() {
        const response = await this.http.post<any>(EVE.getUniverseNamesUrl(), [this.data]).toPromise<IUniverseNamesData>();
        this.ship = response[0];

        this.done = true;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    // public async getShipName(): Promise<string> {
    //     const data = await this.http.post<any>(EVE.getUniverseNamesUrl(), [this.ship]).toPromise<IUniverseNamesData>();
    //     return data[0].name;
    // }
}
