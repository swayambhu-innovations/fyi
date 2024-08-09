import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { Amplify } from 'aws-amplify';
const awsmobile = {
  "aws_project_region": "ap-south-1",
  "aws_cognito_identity_pool_id": "ap-south-1:485eae4c-75c5-4be6-be9c-258a5db59612",
  "aws_cognito_region": "ap-south-1",
  "aws_user_pools_id": "ap-south-1_RUwUBBYNM",
  "aws_user_pools_web_client_id": "4i08cvfsl1scacjoab4dvma8d8",
  "oauth": {},
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],

};
Amplify.configure(awsmobile);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),

    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyA9mqYMpobF0WJuA0h-l1Qft5v7PjVwgOI',
        authDomain: 'fyi1-aa2c2.firebaseapp.com',
        projectId: 'fyi1-aa2c2',
        storageBucket: 'fyi1-aa2c2.appspot.com',
        messagingSenderId: '273891090725',
        appId: '1:273891090725:web:1a3a2b61ba58a8e632bacc',
        measurementId: 'G-CJ026BL27H',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
