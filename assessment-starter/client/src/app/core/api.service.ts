import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Book { id: number; title: string; author: string; publishedDate: string | null; }
export interface Quote { id: number; text: string; author: string | null; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  books = { list: () => this.http.get<Book[]>('/api/books'), create: (x: Omit<Book,'id'>) => this.http.post<Book>('/api/books', x), update: (id: number, x: Omit<Book,'id'>) => this.http.put<Book>(`/api/books/${id}`, x), delete: (id: number) => this.http.delete<void>(`/api/books/${id}`) };
  quotes = { list: () => this.http.get<Quote[]>('/api/quotes'), create: (x: Omit<Quote,'id'>) => this.http.post<Quote>('/api/quotes', x), update: (id: number, x: Omit<Quote,'id'>) => this.http.put<Quote>(`/api/quotes/${id}`, x), delete: (id: number) => this.http.delete<void>(`/api/quotes/${id}`) };
}
