import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable, Subject } from 'rxjs';
import { collection, doc, setDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { EventService } from '../../home/event/event.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  private createOrderUrl = 'https://createorder-uuc4lf2xaa-uc.a.run.app/'; 

  createOrder(amount: number, currency: string = 'INR', receipt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });

    const body = {
      amount,
      currency,
      receipt
    };

    return this.http.post<any>(this.createOrderUrl, body, { headers });
  }


  initiatePayment(orderId: string) {
    const options = {
      key: environment.RAZORPAY_KEY_ID, 
      amount: 1000, 
      currency: 'INR',
      name: 'Your Company',
      description: 'Test Transaction',
      order_id: orderId,
      handler: (response: any) => {
        console.log('Payment successful:', response);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9876543210',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
}