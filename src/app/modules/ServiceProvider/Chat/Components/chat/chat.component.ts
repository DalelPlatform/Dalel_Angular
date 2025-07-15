import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, finalize, catchError, of } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/Chat.model';
import { Message } from '../../models/Message.model'
@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  chats: Chat[] = [];
  messages: Message[] = [];
  selectedChat: Chat | null = null;

  isLoadingChats = false;
  isLoadingMessages = false;
  chatsError = false;
  messagesError = false;

  private destroy$ = new Subject<void>();

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.loadChats();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadChats() {
    this.isLoadingChats = true;
    this.chatsError = false;

    this.chatService.getUserChats().subscribe({
      next: (res) => {
        this.chats = res.Data;
        console.log(this.chats);
      },
      error: (err) => {
        console.error('Error loading chats:', err);
        this.chatsError = true;
        this.isLoadingChats = false;
      }
    });
  }

  selectChat(chat: Chat) {
    if (this.selectedChat?.Id === chat.Id) {
      return; // Already selected
    }

    this.selectedChat = chat;
    this.messages = [];
    this.loadMessages(chat.Id);
  }

  loadMessages(chatId: number) {
    this.isLoadingMessages = true;
    this.messagesError = false;

    this.chatService.getQueriesByChat(chatId).subscribe({
      next: (res) => {
        this.messages = res.Data
        console.log(this.messages);

      },
      error: (err) => {
        console.error("Error loading messages:", err);
        this.messagesError = true;
        this.isLoadingMessages = false;
      }
    });
  }


  formatDate(date: Date): string {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { 
      return messageDate.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  }

  trackByChat(index: number, chat: Chat): number {
    return chat.Id;
  }

  trackByMessage(index: number, message: Message): number {
    return message.Id;
  }
}
