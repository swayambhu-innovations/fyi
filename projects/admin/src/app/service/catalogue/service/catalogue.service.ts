import { Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  currentCatalogue = signal('');

  
  constructor(private firestore: Firestore) {}

 async addCatalogue(catalogueDetail: any) {
    if (catalogueDetail.id) {
      const catalogueDocRef = doc(
        this.firestore,
        'service-catalogue',
        catalogueDetail.id
      );
      await updateDoc(catalogueDocRef, catalogueDetail);
      return { id: catalogueDetail.id };

    } else {
      const newCatalogueDocRef = doc(
        collection(this.firestore, 'service-catalogue')
      );
      catalogueDetail.id = newCatalogueDocRef.id;
      await setDoc(newCatalogueDocRef, catalogueDetail);
      return { id: catalogueDetail.id };

    }
  }
  addCategory(category: any) {
    if (category.id) {
      const catalogueDocRef = doc(
        this.firestore,
        'service-catalogue',
        category.catalogueId,
        'categories',
        category.id
      );
      return updateDoc(catalogueDocRef, category);
    } else {
      const newCatalogueDocRef = doc(
        collection(
          this.firestore,
          'service-catalogue',
          category.catalogueId,
          'categories'
        )
      );
      category.categoryId = newCatalogueDocRef.id;
      return setDoc(newCatalogueDocRef, category);
    }
  }
  addSubCategory(subCategory: any) {
    if (subCategory.id) {
      const catalogueDocRef = doc(
        this.firestore,
        'service-catalogue',
        subCategory.catalogueId,
        'categories',
        subCategory.categoryId,
        'sub-categories',
        subCategory.id
      );
      return updateDoc(catalogueDocRef, subCategory);
    } else {
      const newCatalogueDocRef = doc(
        collection(
          this.firestore,
          'service-catalogue',
          subCategory.catalogueId,
          'categories',
          subCategory.categoryId,
          'sub-categories'
        )
      );
      subCategory.subCategoryId = newCatalogueDocRef.id;
      return setDoc(newCatalogueDocRef, subCategory);
    }
  }

  addDonationInSubcategory(donationDetail:any){
    console.log(this.firestore,
      'service-catalogue',
      donationDetail.catalogueId,
      'categories',
      donationDetail.categoryId,
      'sub-categories',
      donationDetail.subCategoryId,
      'donations')
    if (donationDetail.donationItemId) {
      const catalogueDocRef = doc(
        this.firestore,
        'service-catalogue',
        donationDetail.catalogueId,
        'categories',
        donationDetail.categoryId,
        'sub-categories',
        donationDetail.subCategoryId,
        'donation-items',
        donationDetail.donationItemId
      );
      return updateDoc(catalogueDocRef, donationDetail);
    } else {
      const newCatalogueDocRef = doc(
        collection(
          this.firestore,
          'service-catalogue',
          donationDetail.catalogueId,
          'categories',
          donationDetail.categoryId,
          'sub-categories',
          donationDetail.subCategoryId,
          'donation-items'
        )
      );
      
      donationDetail.donationItemId = newCatalogueDocRef.id;
      return setDoc(newCatalogueDocRef, donationDetail);
    }
  }

  getCatalogueList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(this.firestore, 'service-catalogue');
      onSnapshot(
        collectionRef,
        (snapshot) => {
          const catalogueList = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          observer.next(catalogueList);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getCategoryList(catalogueId: any): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(
        this.firestore,
        'service-catalogue',
        catalogueId,
        'categories'
      );

      onSnapshot(
        collectionRef,
        (snapshot) => {
          const categoryList = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          observer.next(categoryList);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  getSubCategoryList(
    catalogueId: string,
    categoryId: string
  ): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(
        this.firestore,
        'service-catalogue',
        catalogueId,
        'categories',
        categoryId,
        'sub-categories'
      );
      onSnapshot(
        collectionRef,
        (snapshot) => {
          const subCategoryList = snapshot.docs.map((doc) => {
            return doc.data();
          });
          console.log(subCategoryList);
          observer.next(subCategoryList);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getDonationItemList(
    catalogueId: string,
    categoryId: string,
    subCategoryId:string
  ): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(
        this.firestore,
        'service-catalogue',
        catalogueId,
        'categories',
        categoryId,
        'sub-categories',
        subCategoryId,
        'donation-items'
      );
      onSnapshot(
        collectionRef,
        (snapshot) => {
          const DonationItemList = snapshot.docs.map((doc) => {
            return doc.data();
          });
          console.log(DonationItemList);
          observer.next(DonationItemList);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
