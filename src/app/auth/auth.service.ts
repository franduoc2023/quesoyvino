import { Injectable, inject } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService
} from '@azure/msal-angular';
import {
  AccountInfo,
  AuthenticationResult,
  InteractionStatus
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { loginRequest } from './msal-angular.config';

import { NativeAuthService, UserProfile } from './native-auth.service';
import { Capacitor } from '@capacitor/core';
import { isNative, isWeb } from '../core/platform.util';
import { Router } from '@angular/router';     // 👈 importa Router

@Injectable({ providedIn: 'root' })
export class AuthService {
  private msal = inject(MsalService);
  private broadcast = inject(MsalBroadcastService);
  private nativeAuth = inject(NativeAuthService);
  private router = inject(Router);           // 👈 inyecta Router

  currentUser: AccountInfo | null = null;
  userProfile: UserProfile | null = null;

  private readonly useWebMsal = isWeb();

  constructor() {
    console.log('[AuthService] Platform:', Capacitor.getPlatform());
    console.log('[AuthService] useWebMsal:', this.useWebMsal);

    if (this.useWebMsal) {
      this.setupWebMsal();
    } else if (isNative()) {
      this.nativeAuth.userProfile$.subscribe(profile => {
        console.log('[AuthService] userProfile desde NativeAuth:', profile);
        this.userProfile = profile;
      });
    }
  }

  // ========= WEB (MSAL Angular) =========
  private setupWebMsal() {
    const msal = this.msal;
    const broadcast = this.broadcast;

    msal.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult | null) => {
        if (result) {
          msal.instance.setActiveAccount(result.account);
        }
      }
    });

    broadcast.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        const accounts = msal.instance.getAllAccounts();
        this.currentUser = accounts.length > 0 ? accounts[0] : null;

        if (this.currentUser && this.currentUser.idTokenClaims) {
          const claims: any = this.currentUser.idTokenClaims;

          const emailFromArray =
            Array.isArray(claims.emails) && claims.emails.length > 0
              ? claims.emails[0]
              : null;

          this.userProfile = {
            name: claims.given_name ?? claims.name ?? null,
            email: emailFromArray ?? claims.email ?? null,
            oid: claims.oid ?? claims.sub ?? null
          };

          // 👇 AQUÍ redirigimos a /home si venimos de /login
          if (this.router.url === '/login') {
            this.router.navigate(['/home']);
          }

        } else {
          this.userProfile = null;
        }
      });
  }

  async login(): Promise<void> {
    if (this.useWebMsal) {
      console.log('[AuthService] login() usando MSAL web');
      await this.msal.loginRedirect(loginRequest);
    } else {
      console.log('[AuthService] login() usando NativeAuth');
      await this.nativeAuth.login();
    }
  }

  async logout(): Promise<void> {
    if (this.useWebMsal) {
      console.log('[AuthService] logout() usando MSAL web');
      this.currentUser = null;
      this.userProfile = null;
      await this.msal.logoutRedirect();
    } else {
      console.log('[AuthService] logout() usando NativeAuth');
      await this.nativeAuth.logout();
      this.userProfile = null;
    }
  }

  isAuthenticated(): boolean {
    const result = this.useWebMsal
      ? this.currentUser != null
      : this.nativeAuth.isAuthenticated();

    console.log('[AuthService] isAuthenticated()', {
      useWebMsal: this.useWebMsal,
      result,
      userProfile: this.userProfile,
      nativeProfileValue: this.nativeAuth.userProfile
    });

    return result;
  }
}
