import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service.js';

@Component({
    selector: 'app-auth',
    styleUrls: ['./auth.component.scss'],
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {

    public code: string;

    constructor(
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly http: HttpClient,
        private readonly router: Router,
    ) { }

    public async ngOnInit() {
        this.code = this.route.snapshot.queryParamMap.get('code');
        const encodedRandomString = sessionStorage.getItem('challenge');

        const token = await this.authService.getAuthToken(this.code, encodedRandomString);

        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.removeItem('challenge');

        this.router.navigate(['/']).then();
    }
}
