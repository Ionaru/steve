import { Component } from '@angular/core';
import { faBars, faChartNetwork, faHome, faRocket, faUser, faUserAstronaut } from '@fortawesome/pro-regular-svg-icons';

import { AuthService, IAuthResponseData } from './auth/auth.service.js';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent {

    public get authValid() {
        AppComponent.validateAuth();
        return AppComponent.auth;
    }

    public static auth = false;

    public static validateAuth() {
        const token = sessionStorage.getItem('token');

        if (AuthService.isAuthValid(token)) {
            AppComponent.auth = true;
            return;
        }

        sessionStorage.removeItem('token');
        AppComponent.auth = false;
    }

    public homeIcon = faHome;
    public profileIcon = faUser;
    public profileActiveIcon = faUserAstronaut;
    public menuIcon = faBars;
    public tripsIcon = faChartNetwork;
    public shipsIcon = faRocket;

    constructor(private readonly authService: AuthService) { }

    public async revokeAuth() {
        const token = sessionStorage.getItem('token');

        const auth = JSON.parse(token) as IAuthResponseData;
        this.authService.revokeToken(auth.refresh_token).then();
        sessionStorage.removeItem('token');
        AppComponent.validateAuth();
    }

    public async doAuth() {

        const {encodedRandomString, redirectUrl, state} = await AuthService.startAuth();

        sessionStorage.setItem('challenge', encodedRandomString);
        sessionStorage.setItem('state', state);

        window.location.href = redirectUrl;
    }
}
