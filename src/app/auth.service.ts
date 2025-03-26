import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root' // ✅ Ensures AuthService is globally available
})
export class AuthService {
  constructor(private msalService: MsalService) {}

  async login() {
    await this.msalService.instance.initialize(); // Ensure MSAL is initialized

    await this.msalService.instance.loginRedirect({
      authority: 'https://hlkcmtb2cuat.b2clogin.com/hlkcmtb2cuat.onmicrosoft.com/B2C_1A_SI_SU_MEIERTOBLER', // ✅ Forces correct B2C authority
      scopes: ['openid'],
      redirectUri: 'https://chat-app-sigma-ten-24.vercel.app'
    });
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  getUser() {
    const account = this.msalService.instance.getActiveAccount();
    return account ? account.username : null;
  }
}
