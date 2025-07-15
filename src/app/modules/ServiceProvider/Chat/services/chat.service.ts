import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../models/Chat.model';
import { Message } from '../models/Message.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = `${environment.baseApi}Chat`;
  private apiUrl = `${environment.baseApi}ServiceQuaries`
  constructor(private http: HttpClient) { }
  getUserChats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chat`);
  }

  sendMessage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, formData);
  }

  getQueriesByChat(chatId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/chat`, {
    params: { chatId: chatId.toString() }
  });
  }
}
