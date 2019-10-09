import { MdcDialog, MdcIconButton } from '@angular-mdc/web';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faCircle, faCircleNotch, faRocket, faSave } from '@fortawesome/pro-regular-svg-icons';

import { ShipDialog } from './ship.dialog';

@Component({
  selector: 'app-ships',
  styleUrls: ['./ships.component.scss'],
  templateUrl: './ships.component.html',
})
export class ShipsComponent {

    public someIcon = faRocket;
    public infoIcon = faCircle;
    public saveIcon = faSave;
    public checkIcon = faCheck;

    constructor(public dialog: MdcDialog) {}

    public doSave(button: MdcIconButton, myIcon: FaIconComponent) {
        button.setDisabled(true);

        myIcon.spin = true;
        myIcon.icon = faCircleNotch;
        myIcon.render();

        setTimeout(() => {
            myIcon.spin = false;
            myIcon.icon = this.checkIcon;
            myIcon.render();
        }, 1500);
    }

    public openDialog(id: number) {
        const dialogRef = this.dialog.open(ShipDialog, {
            data: id,
        });

        dialogRef.afterClosed().subscribe((result) => {
            // tslint:disable-next-line:no-console
            console.log(result);
        });
    }
}
