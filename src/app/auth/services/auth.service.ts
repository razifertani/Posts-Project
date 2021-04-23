import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/authData.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private token: string | null;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;
    private tokenTimer: any;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) { }

    getToken() {
        return this.token;
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    registerUser(authData: AuthData) {
        this.httpClient.post<any>('http://127.0.0.1:3000/api/user/register', authData)
            .subscribe((response) => {
                console.log(response);
            });
        this.router.navigate(['/login']);
    }

    loginUser(authData: AuthData) {
        this.httpClient.post<any>('http://127.0.0.1:3000/api/user/login', authData)
            .subscribe((response) => {
                console.log(response);
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresIn = response.expiresIn;
                    this.tokenTimer = setTimeout(
                        () => {
                            this.logout();
                        },
                        expiresIn * 1000,
                    );
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
                    this.saveAuthData(token, expirationDate);
                    this.router.navigate(['/']);
                }
            });
    }

    autoAuthUser() {
        const authInfos = this.getAuthData();
        if (!authInfos) {
            return;
        } else {
            const now = new Date();
            const expiresIn = authInfos.expirationDate.getTime() - now.getTime();
            if (expiresIn > 0) {
                this.token = authInfos.token;
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.tokenTimer = setTimeout(
                    () => {
                        this.logout();
                    },
                    expiresIn / 1000,
                );
            }
        }

    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toISOString());
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        if (!token || !expirationDate) {
            return;
        } else {
            return {
                token: token,
                expirationDate: new Date(expirationDate),
            }
        }
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
    }
}