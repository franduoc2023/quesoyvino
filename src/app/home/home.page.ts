// src/app/home/home.page.ts
import { Component, inject } from '@angular/core';
import { NgIf, JsonPipe } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    NgIf,
    RouterModule,     
  ],
})
export class HomePage {
  auth = inject(AuthService);
}
