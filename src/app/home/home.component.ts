import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service.js';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {

    public async doAuth() {

        const {encodedRandomString, redirectUrl} = await AuthService.startAuth();

        sessionStorage.setItem('challenge', encodedRandomString);

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

}
