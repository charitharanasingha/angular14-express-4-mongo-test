import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

const baseUrl = 'http://localhost:8080/api/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Message[]> {
    return this.http.get<Message[]>(baseUrl);
  }

  get(id: any): Observable<Message> {
    console.log('xxxsxs');
    return this.http.get<Message>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Message[]> {
    return this.http.get<Message[]>(`${baseUrl}?title=${title}`);
  }
}