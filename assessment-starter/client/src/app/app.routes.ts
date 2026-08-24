import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { AuthComponent } from './features/auth/auth.component';
import { BooksComponent } from './features/books/books.component';
import { QuotesComponent } from './features/quotes/quotes.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'books', component: BooksComponent, canActivate: [authGuard] },
  { path: 'quotes', component: QuotesComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'books' },
  { path: '**', redirectTo: 'books' }
];
