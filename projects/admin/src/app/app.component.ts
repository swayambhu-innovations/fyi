import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore, setDoc } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin';

  constructor(private firestore:Firestore){}
  ngOnInit() {
    console.log('work')
    addDoc(collection(this.firestore, 'test'),{
      name:'rahul'
    }
  )
  }
}
