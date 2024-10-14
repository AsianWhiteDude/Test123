// src/app/chat/chat.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private socket!: WebSocket;
  public messages: string[] = [];
  public message: string = '';

  ngOnInit(): void {
    this.connect();
  }

  connect() {
    this.socket = new WebSocket('ws://localhost:8000/ws/chat/general/'); // Connect to the general chat room

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messages.push(data.message);
    };

    this.socket.onclose = (event) => {
      console.error('WebSocket closed:', event);
    };
  }

  sendMessage() {
    if (this.message) {
      this.socket.send(JSON.stringify({ message: this.message }));
      this.message = '';
    }
  }
}
