export interface IJWTToken {
    scp: string[] | string;
    jti: string;
    kid: string;
    sub: string;
    azp: string;
    name: string;
    owner: string;
    exp: number;
    iss: string;
}

export interface IAuthResponseData {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public static async startAuth() {
        const randomString = AuthService.createRandomString(32);
        const encodedRandomString = AuthService.base64urlEncode(randomString);

        const hashedString = await AuthService.hashSHA256(encodedRandomString);
        const encodedHash = AuthService.base64urlEncode(hashedString);

        const params = new HttpParams()
            .set('response_type', 'code')
            .set('redirect_uri', encodeURI(environment.ssoCallbackURL))
            .set('client_id', '28ea0d4ef8ca4465962e37304a3d695a')
            .set('scope', 'esi-location.read_online.v1')
            .set('code_challenge', encodedHash)
            .set('code_challenge_method', 'S256')
            .set('state', '123456');

        const redirectUrl = 'https://login.eveonline.com/v2/oauth/authorize/?' + params.toString();

        return {
            encodedRandomString,
            redirectUrl,
        };
    }

    // private static refreshInterval;

    private static createRandomString(bytes: number) {
        return String.fromCharCode(...crypto.getRandomValues(new Uint8Array(bytes)));
    }

    private static base64urlEncode(str: string) {
        return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    private static async hashSHA256(str: string) {
        return String.fromCharCode(...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))));
    }

    constructor(
        private readonly http: HttpClient,
    ) { }

    public async getAuthToken(code: string, codeVerifier: string): Promise<IAuthResponseData> {

        const body = new HttpParams()
            .set('grant_type', 'authorization_code')
            .set('code', code)
            .set('client_id', '28ea0d4ef8ca4465962e37304a3d695a')
            .set('code_verifier', codeVerifier);

        return this.http.post<any>('https://login.eveonline.com/v2/oauth/token', body, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).toPromise<IAuthResponseData>();
    }

    public async refreshToken(refreshToken: string) {
        const body = new HttpParams()
            .set('grant_type', 'refresh_token')
            .set('refresh_token', refreshToken)
            .set('client_id', '28ea0d4ef8ca4465962e37304a3d695a');

        return this.http.post<any>('https://login.eveonline.com/v2/oauth/token', body, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).toPromise<IAuthResponseData>();
    }
}
