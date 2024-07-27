import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../../../sharedComponent/header-with-back/header-with-back.component";
@Component({
  selector: 'app-slab-list',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './slab-list.component.html',
  styleUrl: './slab-list.component.scss'
})
export class SlabListComponent {
  constructor(private router: Router) { }
  items = [
    {
      image: '/assets/homepage/slabimage.svg',  
      title: 'Panchganga Slab'
    },
    {
      image: '/assets/homepage/slabimage.svg',  
      title: 'Assi Slab'
    },
    {
      image: '/assets/homepage/slabimage.svg',  
      title: 'Panchganga Slab'
    },
    {
      image: '/assets/homepage/slabimage.svg',  
      title: 'Assi Slab'
    }
  ];

  movetovarient(){
    this.router.navigate(['varients']);
  }

}
