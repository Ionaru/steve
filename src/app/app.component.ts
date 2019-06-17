import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service.js';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public title = 'STEVE';

    public async ngOnInit() {
        const token = sessionStorage.getItem('token');

        if (AuthService.isAuthValid(token)) {
            return;
        }

        sessionStorage.removeItem('token');
        return;
    }
}
