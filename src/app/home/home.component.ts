import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service.js';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    constructor() { }

    public async ngOnInit() {
    }

    public async doAuth() {

        const {encodedRandomString, redirectUrl} = await AuthService.startAuth();

        sessionStorage.setItem('challenge', encodedRandomString);

        window.location.href = redirectUrl;
    }

}
