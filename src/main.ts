import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from '@azure/msal-browser';
import { TranslateModule } from '@ngx-translate/core';

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '2f80d666-387a-470e-8d2b-8ba3ff8ca88b',
    knownAuthorities: ['hlkcmtb2cuat.b2clogin.com'], // ✅ Explicitly tell MSAL to use B2C authority
    authority: 'https://hlkcmtb2cuat.b2clogin.com/hlkcmtb2cuat.onmicrosoft.com/B2C_1A_SI_SU_MEIERTOBLER',
    redirectUri: 'https://chat-app-sigma-ten-24.vercel.app'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // ✅ Prevents losing tokens after page reload
    storeAuthStateInCookie: true // ✅ Fixes issues in Safari/Edge Private mode
  }
});

async function bootstrap() {
  await msalInstance.initialize(); // ✅ Ensures MSAL is initialized before app starts

  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter([]), // ✅ Provide routing
      importProvidersFrom(
        MsalModule.forRoot(
          msalInstance,
          {
            interactionType: InteractionType.Redirect,
            authRequest: { scopes: ['openid', 'profile', 'email'] }
          },
          {
            interactionType: InteractionType.Redirect,
            protectedResourceMap: new Map([['https://graph.microsoft.com/v1.0/me', ['user.read']]])
          }
        ),
        TranslateModule.forRoot()
      )
    ]
  }).catch(err => console.error(err));
}

bootstrap();
