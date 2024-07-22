import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

  constructor(private firestore: Firestore) {}

  addUser(userDetail: any) {
    console.log(userDetail);
    if (userDetail.userId) {
      const userDocRef = doc(this.firestore, "admin", userDetail.userId);
      return updateDoc(userDocRef, userDetail);
    } else {

      const newUserDocRef = doc(collection(this.firestore, "admin")); 
      userDetail.userId = newUserDocRef.id; 
      return setDoc(newUserDocRef, userDetail);

    }
  }

  getUsers(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(this.firestore, 'admin');
      onSnapshot(collectionRef, (snapshot) => {
        const userList = snapshot.docs.map(doc => ({
          ...doc.data()
        }));
        observer.next(userList);
      }, (error) => {
        observer.error(error);
      });
    })
  }
  
  deleteUser(userId: any) {
    return deleteDoc(doc(this.firestore, "admin", userId));
  }
}
