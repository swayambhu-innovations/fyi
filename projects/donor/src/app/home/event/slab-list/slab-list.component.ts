import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderWithBackComponent } from '../../../sharedComponent/header-with-back/header-with-back.component';
import { EventService } from '../event.service';
import { LoadingService } from '../../../../../../shared-ui/src/lib/spinner/loading.service';
@Component({
  selector: 'app-slab-list',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './slab-list.component.html',
  styleUrl: './slab-list.component.scss',
})
export class SlabListComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public EventService: EventService,
    private LoadingService:LoadingService,
  ) {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      if (params.get('id') !== null) {
        this.eventId = params.get('id') || '';
      }
    });
    if(!this.EventService.bookingDetails()['event']){
      this.router.navigate(['/home'])
    }
  }
  eventId: any;
  // items = [
  //   {
  //     image: '/assets/homepage/slabimage.svg',
  //     title: 'Panchganga Slab',
  //   },
  //   {
  //     image: '/assets/homepage/slabimage.svg',
  //     title: 'Assi Slab',
  //   },
  //   {
  //     image: '/assets/homepage/slabimage.svg',
  //     title: 'Panchganga Slab',
  //   },
  //   {
  //     image: '/assets/homepage/slabimage.svg',
  //     title: 'Assi Slab',
  //   },
  // ];

  ngOnInit(){
    this.LoadingService.show();
    this.loadSlabs().then(() => {
      this.LoadingService.hide();
    });

  }


  async loadSlabs() {
    // Simulate a delay for loading slabs, replace with actual logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
  movetovarient(slabId: any,slab:any) {
    let bookingDetails =this.EventService.bookingDetails()
    bookingDetails['slab'] = slab;
    this.EventService.bookingDetails.set(bookingDetails);
    this.router.navigate(['varient', slabId]);
  }
}
