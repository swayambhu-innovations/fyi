import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { ToastService } from '../../../../../shared-ui/src/lib/toast/service/toast.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProfileInfoService {
  constructor(private Firestore: Firestore,private ToastService:ToastService,private router:Router) {}
  
  async updateProfileInfo(profileInfo: any) {
    setDoc(doc(this.Firestore, 'users', profileInfo.uid), profileInfo);
    
  }
}
