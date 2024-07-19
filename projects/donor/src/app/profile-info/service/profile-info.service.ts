import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class ProfileInfoService {
  constructor(private Firestore: Firestore) {}
  
  async updateProfileInfo(profileInfo: any) {
    return setDoc(doc(this.Firestore, 'users', profileInfo.uid), profileInfo);
  }
}
