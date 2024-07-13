import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [NgFor],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.scss'
})
export class AddeventComponent {
  selected=""
  constructor(private router: Router) {}
  submit(select:string){
    this.selected=select;
  }
  images: string[] = [];

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }
  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}
