import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore, setDoc } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { NavbarComponent } from './sharedComponent/navbar/navbar.component';
import { AddTaxTypeComponent } from './service/tax/add-tax-type/add-tax-type.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,AddTaxTypeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin';

  constructor(private firestore:Firestore){}
  ngOnInit() {
//     console.log('work')
//     addDoc(collection(this.firestore, 'test-types'),{
//       name:'rahul'
//     }
//  )
  }
}
