import { MdcDialog, MdcIconButton } from '@angular-mdc/web';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faCircle, faCircleNotch, faRocket, faSave } from '@fortawesome/pro-regular-svg-icons';
import { DialogSimple } from './dialog-simple';

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
        myIcon.iconProp = faCircleNotch;
        myIcon.ngOnChanges({});

        setTimeout(() => {
            myIcon.spin = false;
            myIcon.iconProp = this.checkIcon;
            myIcon.ngOnChanges({});
        }, 1500);
    }

    public openDialog(id: number) {
        const dialogRef = this.dialog.open(DialogSimple, {
            data: id,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
    }
}
