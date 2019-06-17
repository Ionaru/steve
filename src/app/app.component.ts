import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { IJWTToken } from './auth/auth.service.js';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public title = 'steve';

    constructor() {}

    public async ngOnInit() {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return;
        }

        const jwt = jwt_decode<IJWTToken>(token);

        const maxExpiryTime = (Date.now() / 1000) + 60;

        if (jwt.exp < maxExpiryTime) {
            sessionStorage.removeItem('token');
            return;
        }

        console.log(jwt);
    }
}
