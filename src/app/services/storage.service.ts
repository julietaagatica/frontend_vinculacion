import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session.model';
import { User } from 'src/app/models/user.model';

@Injectable()
export class StorageService {

    private localStorageService;
    private sessionStorage;
    private currentSession: Session = null;

    constructor(private router: Router) {
        this.localStorageService = localStorage;
        this.sessionStorage = sessionStorage;
        this.currentSession = this.loadSessionData();
    }

    catchItem(name, item) {
        this.sessionStorage.setItem(name, JSON.stringify(item));
    }

    deleteItem(name) {
        this.sessionStorage.removeItem(name);
    }

    getCachedItem(name) {
        return new Promise((resolve, reject) => {
            let item = this.sessionStorage.getItem(name);
            if (item != null) {
                resolve(JSON.parse(item));
            } else {
                resolve(null)
            }
            reject(null);
        });
    }

    setCurrentSession(session: Session): void {
        this.currentSession = session;
        this.localStorageService.setItem('currentUser', JSON.stringify(session));
    }

    loadSessionData(): Session {
        const sessionStr = this.localStorageService.getItem('currentUser');
        return (sessionStr && sessionStr !== 'undefined') ? <Session>JSON.parse(sessionStr) : null;
    }

    getCurrentSession(): Session {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        this.localStorageService.removeItem('currentUser');
        this.currentSession = null;
    }

    getCurrentUser(): User {
        const session: Session = this.getCurrentSession();
        return (session && session.user) ? session.user : null;
    }

    isAuthenticated(): boolean {
        return this.getCurrentToken() != null;
    }

    getCurrentToken(): string {
        const session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    }

    logout(): void {
        this.removeCurrentSession();
        this.router.navigate(['login']);
    }

}
