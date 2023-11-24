import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  constructor(private http: HttpClient) {}

  // sendSubscribeForm(data: any): Observable<any> {
  //   return this.http.post('subscribe.php', data);
  // }

  sendSubscribeForm<T, R>(data: T): Observable<R> {
    return this.http.post<R>('subscribe.php', data);
  }
}
