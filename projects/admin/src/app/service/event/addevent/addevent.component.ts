import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [NgFor],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.scss'
})
export class AddeventComponent {
  selected=""
  constructor(private router: Router,private storage: Storage) {}
  submit(select:string){
    this.selected=select;
  }

  images: string[] = [];
  uploadPercent: number = 0;

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  async addImage(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(async file =>{
        const filePath = `event/${new Date().getTime()}`;
        console.log(filePath)
        await uploadBytesResumable(ref(this.storage, filePath), file);
        const fileUrl = await getDownloadURL(ref(this.storage, filePath));
        this.images.push(fileUrl);
      });
    }
    }
 
  


  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
}
