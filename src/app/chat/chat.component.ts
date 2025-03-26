import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: { user: string; text: string }[] = [];
  newMessage: string = '';
  user: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser() || 'Guest';
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ user: this.user, text: this.newMessage });
      this.newMessage = '';
    }
  }
}
