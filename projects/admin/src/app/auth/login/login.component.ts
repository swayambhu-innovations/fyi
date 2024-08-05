import { Component, inject } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(public auth: AuthService) { }
  ngOnInit() {
    // this.auth.handleRedirectResult();
  }

 
}
