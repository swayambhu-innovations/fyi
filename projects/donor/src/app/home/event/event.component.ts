import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from './event.service';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../../../../../shared-ui/src/lib/spinner/loading.service';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  events = [
    {
      title: 'Cearic Kashi Summit 2024',
      image: '/assets/homepage/sliderimage.svg',
      link: '/slab-list',
    },
    {
      title: 'Cearic Kashi Summit 2025',
      image: '/assets/homepage/sliderimage.svg',
      link: '/slab-list',
    },
    {
      title: 'Cearic Kashi Summit 2026',
      image: '/assets/homepage/sliderimage.svg',
      link: '/slab-list',
    },
    {
      title: 'Cearic Kashi Summit 2027',
      image: '/assets/homepage/sliderimage.svg',
      link: '/slab-list',
    },
    // Add more surveys here
  ];

  slabs = [
    { title: 'Panchang slab', image: '/assets/homepage/event_1.1.svg' },
    { title: 'Assi slab', image: '/assets/homepage/event_1.2.svg' },
    { title: 'Assi slab', image: '/assets/homepage/event_1.3.svg' },
  ];
  constructor(
    private router: Router,
    public eventService: EventService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getEvent();
  }
  async getEvent() {
    this.loadingService.show();
    const stateId = localStorage.getItem('stateDocId');
    const cityId = localStorage.getItem('cityDocId');
    const cityAddress = `city-catalogue/${stateId}/city/${cityId}`;

    try {
      const cityDoc: any = await firstValueFrom(
        this.eventService.fetchDoc(cityAddress)
      );
      this.eventService.cityDoc.set({ ...cityDoc, stateId });

      const eventList: any[] = [];
      const itineraryList: { [key: string]: any[] } = {};
      const slabList: { [key: string]: any[] } = {};
      const variantList: { [key: string]: any[] } = {};

      for (const eventId of cityDoc.events) {
        const event: any = await firstValueFrom(
          this.eventService.fetchDoc(`events/${eventId}`)
        );
        if (event.active) {
          eventList.push(event);

          const itinerary: any = await firstValueFrom(
            this.eventService.fetchDoc(`events/${eventId}/itinerary/activities`)
          );
          itineraryList[eventId] = itinerary;

          const slabs: any[] = await firstValueFrom(
            this.eventService.fetchDocs(`events/${eventId}/slab-variant`)
          );

          slabList[eventId] = [];

          for (const slab of slabs) {
            const slabDetail: any = await firstValueFrom(
              this.eventService.fetchDoc(
                `events/${eventId}/slab-variant/${slab.slabId}`
              )
            );
            if (slabDetail.active) {
              slabList[eventId].push(slabDetail);

              const variants: any[] = await firstValueFrom(
                this.eventService.fetchDocs(
                  `events/${eventId}/slab-variant/${slab.slabId}/variants`
                )
              );
              variantList[slab.slabId] = [];

              for (const variant of variants) {
                const variantDetail: any = await firstValueFrom(
                  this.eventService.fetchDoc(
                    `events/${eventId}/slab-variant/${slab.slabId}/variants/${variant.variantId}`
                  )
                );
                if (variantDetail.active) {
                  variantList[slab.slabId].push(variantDetail);
                }
                this.loadingService.hide();
              }
            }
          }
        }
      }

      this.eventService.eventList.set(eventList);
      this.eventService.itineraryList.set(itineraryList);
      this.eventService.slabList.set(slabList);
      this.eventService.variantList.set(variantList);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  seeAllEvent() {
    this.router.navigate(['event-list']);
  }
  onSurveyClick(survey: any): void {
    window.location.href = survey.link;
  }
  viewSlsbList(eventId: any) {
    console.log(eventId);
    this.router.navigate(['slab', eventId]);
  }
}
