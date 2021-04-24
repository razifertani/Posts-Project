import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/authData.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authStatusListener = new Subject<boolean>();
    private token: string | null;
    private isAuthenticated = false;
    private tokenTimer: any;
    private userId: string | null;

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
    getUserId() {
        return this.userId;
    }

    registerUser(authData: AuthData) {
        return this.httpClient.post<any>("https://todos--project.herokuapp.com/api/user/register", authData)
            .subscribe((response) => {
                this.router.navigate(['/auth/login']);
            }, error => {
                this.authStatusListener.next(false);
            });
    }

    loginUser(authData: AuthData) {
        this.httpClient.post<any>("https://todos--project.herokuapp.com/api/user/login", authData)
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
                    this.userId = response.userId;
                    if (this.userId) {
                        this.saveAuthData(token, expirationDate, this.userId);
                    }
                    this.router.navigate(['/']);
                }
            }, error => {
                this.authStatusListener.next(false);
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
                this.userId = authInfos.userId;
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
        this.userId = null;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        const userId = localStorage.getItem('userId');
        if (!token || !expirationDate) {
            return;
        } else {
            return {
                token: token,
                expirationDate: new Date(expirationDate),
                userId: userId,
            }
        }
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');

    }
}