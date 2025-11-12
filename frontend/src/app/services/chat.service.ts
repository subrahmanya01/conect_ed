import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseModel } from '../interfaces/api-response-model';
import { Observable } from 'rxjs';
import { AddChatModel } from '../interfaces/chat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl : string = environment.apiBaseUrl;
  
  constructor(private httpClient : HttpClient) { }

  public getChatUsers(userId : string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + `/chat/get-chat-users/${userId}`);
  }

  public getUserChats(from : string, to: string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + `/chat/get/${from}/${to}`);
  }

  public addChat(chat : AddChatModel):Observable<ApiResponseModel>
  {
    return this.httpClient.post<ApiResponseModel>(this.baseUrl + `/chat/add-chat`, chat);
  }
}
