import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({ selector: 'app-navbar', standalone: true, imports: [RouterLink, RouterLinkActive], template: `
<nav class="navbar navbar-expand-md bg-body border-bottom" aria-label="Main navigation">
 <div class="container-fluid container-xl">
  <a class="navbar-brand fw-bold" routerLink="/books"><i class="fa-solid fa-book-open text-primary me-2"></i>BookNest</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
  <div class="collapse navbar-collapse" id="mainNav">
   @if (auth.authenticated) { <div class="navbar-nav me-auto"><a class="nav-link" routerLink="/books" routerLinkActive="active"><i class="fa-solid fa-book me-1"></i>Books</a><a class="nav-link" routerLink="/quotes" routerLinkActive="active"><i class="fa-solid fa-quote-left me-1"></i>My Quotes</a></div> }
   <div class="d-flex align-items-center gap-2 py-2 py-md-0">
    <button class="btn btn-outline-secondary" (click)="toggleTheme()" aria-label="Toggle color theme"><i [class]="dark() ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i></button>
    @if (auth.authenticated) { <span class="small text-body-secondary">{{auth.username()}}</span><button class="btn btn-outline-danger" (click)="auth.logout()"><i class="fa-solid fa-right-from-bracket me-1"></i>Log out</button> }
   </div>
  </div>
 </div>
</nav>` })
export class NavbarComponent {
  readonly auth = inject(AuthService); readonly dark = signal(localStorage.getItem('theme') === 'dark');
  constructor() { document.documentElement.dataset['bsTheme'] = this.dark() ? 'dark' : 'light'; }
  toggleTheme() { this.dark.update(x => !x); const theme = this.dark() ? 'dark' : 'light'; document.documentElement.dataset['bsTheme'] = theme; localStorage.setItem('theme', theme); }
}
