import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore, setDoc } from '@angular/fire/firestore';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddTaxTypeComponent } from './service/tax/add-tax-type/add-tax-type.component';
import { NotAdminComponent } from './auth/not-admin/not-admin.component';
import { NavbarComponent } from './sharedComponent/navbar/navbar.component';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NotAdminComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';

  constructor(private firestore: Firestore, private router: Router) {}
  // ngOnInit() {
  //     console.log('work')
  //     addDoc(collection(this.firestore, 'test-types'),{
  //       name:'rahul'
  //     }
  //  )


  // ngOnInit() {
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe((event: NavigationEnd) => {
  //       this.checkIfHomePage();
  //     });
  // }

  // checkIfHomePage() {
  //   const currentUrl = this.router.url;
  //   console.log(currentUrl);
  // }
}
