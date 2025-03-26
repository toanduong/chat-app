import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { StreamChat } from "stream-chat";
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'stream-chat-angular';

import {
  ChannelService,
  ChatClientService,
  StreamAutocompleteTextareaModule,
  StreamChatModule,
  StreamI18nService,
} from 'stream-chat-angular';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    RouterModule,
    TranslateModule,
    StreamAutocompleteTextareaModule,
    StreamChatModule,
  ],
  providers: [MsalService, MsalGuard, MsalBroadcastService, StreamI18nService,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: any;

  constructor(private authService: MsalService,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private themeService: ThemeService
  ) {
    themeService.theme$.next('square');
    
  }

  onInitChannel() {
    if (this.user !== null && this.user != undefined) {
      console.log(this.user);
      const apiKey = '7fxyyfbvwwae';
      const userId = this.user.localAccountId;
      const userName = this.user.name;

      // const devToken = StreamChat.getInstance(apiKey).devToken(userLogin.uid);
      // console.log(devToken);
      // const userToken = devToken;

      const userToken = this.getToken(userId);

      const user = {
        id: userId,
        name: userName,
        image: `https://getstream.io/random_png/?name=${userName}`,
      };

      this.chatService.init(apiKey, user, userToken);
      this.streamI18nService.setTranslation();
    }
    
  }

  async ngOnInit() {
    
    //this.user = this.authService.getUser();
    this.authService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
      if (result && result.account) {
        this.user =  this.authService.instance.getActiveAccount();
        console.log(this.user);
        console.log('User authenticated:', result.account);
        this.authService.instance.setActiveAccount(result.account); // ✅ Ensure user is set

        this.onInitChannel();

        const userId = this.user.localAccountId;
        console.log(userId);
        this.channelService.init({
          type: 'messaging',
          members: { $in: [userId] },
        });

        
      }
    }).catch(err => console.error('Redirect error:', err));
  }

  login() {
    this.authService.instance.loginRedirect();
  }

  logout() {
    this.authService.instance.logoutRedirect();
  }

  invite() {
    window.open("", "_blank");
  }

  private getToken(uid: string) {
    switch (uid) {
      case "FsPaFNh0VJVJVTDu2l4DiSoT0p72":
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRnNQYUZOaDBWSlZKVlREdTJsNERpU29UMHA3MiJ9.izEIDtmrkfUNoE5dDS9IRvGbjyqH2C79pbHYyqNNX_U";
      case "e9e5b11c-28c8-4c70-b3e5-b02ca3c1afc0":
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTllNWIxMWMtMjhjOC00YzcwLWIzZTUtYjAyY2EzYzFhZmMwIn0.ZakXepKiQl-q2oM_J8pMiO-s_dngMqLlwwASrPFA9IM";
      default:
        return "";
    }
  }
}
