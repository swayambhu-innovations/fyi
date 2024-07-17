import { Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(private Firestore:Firestore) { }
  updateProfileInfo(profileInfo:any){
   return updateDoc(doc(this.Firestore,'users',profileInfo.uid),profileInfo);
  }
}
