import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({ standalone: true, imports: [ReactiveFormsModule], template: `
<div class="page-shell"><div class="card auth-card"><div class="card-body p-4 p-md-5">
 <h1 class="h3">{{registerMode() ? 'Create account' : 'Welcome back'}}</h1><p class="text-body-secondary">{{registerMode() ? 'Register to manage your collection.' : 'Sign in to your books and quotes.'}}</p>
 @if(error()){<div class="alert alert-danger" role="alert">{{error()}}</div>}
 <form [formGroup]="form" (ngSubmit)="submit()">
  <div class="mb-3"><label class="form-label" for="username">Username</label><input id="username" class="form-control" formControlName="username" autocomplete="username"></div>
  <div class="mb-4"><label class="form-label" for="password">Password</label><input id="password" type="password" class="form-control" formControlName="password" [autocomplete]="registerMode() ? 'new-password' : 'current-password'"><div class="form-text">At least 8 characters.</div></div>
  <button class="btn btn-primary w-100" [disabled]="form.invalid || busy()">{{busy() ? 'Please wait…' : (registerMode() ? 'Register' : 'Log in')}}</button>
 </form>
 <button class="btn btn-link w-100 mt-3" (click)="toggleMode()">{{registerMode() ? 'Already have an account? Log in' : 'New here? Create an account'}}</button>
</div></div></div>` })
export class AuthComponent {
  private fb=inject(FormBuilder); private auth=inject(AuthService); private router=inject(Router);
  readonly registerMode=signal(false); readonly busy=signal(false); readonly error=signal('');
  readonly form=this.fb.nonNullable.group({username:['',[Validators.required,Validators.minLength(3)]],password:['',[Validators.required,Validators.minLength(8)]]});
  toggleMode(){this.registerMode.update(value=>!value);this.error.set('');}
  submit(){if(this.form.invalid)return; this.busy.set(true);this.error.set('');const request=this.registerMode()?this.auth.register(this.form.getRawValue()):this.auth.login(this.form.getRawValue());request.subscribe({next:()=>void this.router.navigate(['/books']),error:e=>{this.error.set(e.error?.message??'Something went wrong.');this.busy.set(false);}});}
}
