import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    NgIf,
  ],
})
export class LoginPage implements OnInit {

  auth = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    // Si ya está autenticado, lo mando directo al home
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.auth.login();
    // Si tu flujo de login NO redirige solo,
    // luego podrías hacer:
    // this.router.navigate(['/home']);
  }
}
