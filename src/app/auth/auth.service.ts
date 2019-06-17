import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment.js';

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
            .set('client_id', AuthService.clientID)
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

    /**
     * Checks if a auth token is still valid.
     *
     * Not valid if:
     * - No token saved.
     * - Token expiry is less than one minute from now.
     */
    public static isAuthValid(token?: string): boolean {
        if (!token) {
            return false;
        }

        const auth = JSON.parse(token) as IAuthResponseData;
        const jwt = jwt_decode<IJWTToken>(auth.access_token);

        const maxExpiryTime = (Date.now() / 1000) + 60; // Now + one minute.

        return (jwt.exp > maxExpiryTime);
    }

    /**
     * Checks if a refresh token is still valid.
     *
     * Not valid if:
     * - No token saved.
     * - Token expiry is more than 30 days ago.
     *
     * NOTE: Does not consider revocation of the refresh token.
     */
    public static isRefreshValid(token?: string) {
        if (!token) {
            return false;
        }

        const auth = JSON.parse(token) as IAuthResponseData;
        const jwt = jwt_decode<IJWTToken>(auth.access_token);

        const maxRefreshTokenAge = (Date.now() / 1000) - 2592000; // Now - 30 days.

        return jwt.exp > maxRefreshTokenAge;
    }

    // private static refreshInterval;

    private static defaultHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
    private static clientID = '28ea0d4ef8ca4465962e37304a3d695a';

    private static createRandomString(bytes: number) {
        const thing = new Uint8Array(bytes);
        return String.fromCharCode(...crypto.getRandomValues(thing));
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
            .set('client_id', AuthService.clientID)
            .set('code_verifier', codeVerifier);

        return this.http.post<any>('https://login.eveonline.com/v2/oauth/token', body, {
            headers: AuthService.defaultHeaders,
        }).toPromise<IAuthResponseData>();
    }

    public async refreshToken(refreshToken: string) {
        const body = new HttpParams()
            .set('grant_type', 'refresh_token')
            .set('refresh_token', refreshToken)
            .set('client_id', AuthService.clientID);

        return this.http.post<any>('https://login.eveonline.com/v2/oauth/token', body, {
            headers: AuthService.defaultHeaders,
        }).toPromise<IAuthResponseData>();
    }

    public async revokeToken(refreshToken: string) {
        const body = new HttpParams()
            .set('token', refreshToken)
            .set('token_type_hint', 'refresh_token')
            .set('client_id', AuthService.clientID);

        return this.http.post<any>('https://login.eveonline.com/v2/oauth/revoke', body, {
            headers: AuthService.defaultHeaders,
        }).toPromise<undefined>();
    }
}
