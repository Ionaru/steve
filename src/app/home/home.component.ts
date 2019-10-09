import { Component, OnInit } from '@angular/core';
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import { AppComponent } from '../app.component';

import { AuthService, IAuthResponseData } from '../auth/auth.service';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    public someIcon = faKey;

    constructor(private readonly authService: AuthService) { }

    public async doAuth() {

        const {encodedRandomString, redirectUrl, state} = await AuthService.startAuth();

        sessionStorage.setItem('challenge', encodedRandomString);
        sessionStorage.setItem('state', state);

        window.location.href = redirectUrl;
    }

    public authValid() {
        const token = sessionStorage.getItem('token');

        if (AuthService.isAuthValid(token)) {
            return true;
        }

        sessionStorage.removeItem('token');
        return false;
    }

    public async revokeAuth() {
        const token = sessionStorage.getItem('token');

        const auth = JSON.parse(token) as IAuthResponseData;
        this.authService.revokeToken(auth.refresh_token).then();
        sessionStorage.removeItem('token');
    }

    public async refreshToken() {
        const token = sessionStorage.getItem('token');

        const auth = JSON.parse(token) as IAuthResponseData;
        this.authService.refreshToken(auth.refresh_token).then().catch(() => {
            sessionStorage.removeItem('token');
        });
    }

    public ngOnInit() {
        AppComponent.validateAuth();
    }
}
