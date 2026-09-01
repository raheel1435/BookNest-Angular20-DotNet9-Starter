import { environment } from '../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string | null;
}

export interface Quote {
  id: number;
  text: string;
  author: string | null;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  books = {
    list: () =>
      this.http.get<Book[]>(`${environment.apiUrl}/api/books`),

    create: (x: Omit<Book, 'id'>) =>
      this.http.post<Book>(`${environment.apiUrl}/api/books`, x),

    update: (id: number, x: Omit<Book, 'id'>) =>
      this.http.put<Book>(`${environment.apiUrl}/api/books/${id}`, x),

    delete: (id: number) =>
      this.http.delete<void>(`${environment.apiUrl}/api/books/${id}`)
  };

  quotes = {
    list: () =>
      this.http.get<Quote[]>(`${environment.apiUrl}/api/quotes`),

    create: (x: Omit<Quote, 'id'>) =>
      this.http.post<Quote>(`${environment.apiUrl}/api/quotes`, x),

    update: (id: number, x: Omit<Quote, 'id'>) =>
      this.http.put<Quote>(`${environment.apiUrl}/api/quotes/${id}`, x),

    delete: (id: number) =>
      this.http.delete<void>(`${environment.apiUrl}/api/quotes/${id}`)
  };
}
