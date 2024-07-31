import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from './event.service';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../../../../../shared-ui/src/lib/spinner/loading.service';
import { DataProviderService } from '../../auth/service/data-provider.service';
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
    private loadingService: LoadingService,
    private DataProviderService: DataProviderService
  ) {}

  ngOnInit(): void {

    this.loadingService.show();

    setTimeout(() => {
      this.getEvent();

    }, 3000);
  }
  async getEvent() {

    let stateId = localStorage.getItem('stateDocId');
    let cityId = localStorage.getItem('cityDocId');
    let cityAddress = '';

    

    try {
      if (!this.DataProviderService.loggedIn) {
        stateId = localStorage.getItem('stateDocId');
        cityId = localStorage.getItem('cityDocId');
        cityAddress = `city-catalogue/${stateId}/city/${cityId}`;
      } else {
        let uid = this.DataProviderService.currentUser?.userData.uid;
        const addressList = await firstValueFrom(
          this.eventService.fetchDocs(`users/${uid}/addresses`)
        );
        this.eventService.addressList.set(addressList);

        for(const address of addressList){
          if(address.active){
            this.eventService.activeAddress.set(address);
            stateId = address.selectedStateId;
            cityId = address.selectedCityId;
            cityAddress = `city-catalogue/${stateId}/city/${cityId}`;
          }
      }
    }
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
              if (Object.keys(variantList).length > 0) {
                slabList[eventId].push(slabDetail);
              }
            }
          }
          if (Object.keys(slabList).length > 0) {
            eventList.push(event);
          }
        }
      }


      this.eventService.eventList.set(eventList);
      this.eventService.itineraryList.set(itineraryList);
      this.eventService.slabList.set(slabList);
      this.eventService.variantList.set(variantList);
    } catch (error) {
      console.error('Error fetching events:', error);
      this.loadingService.hide();

    }
  }

  seeAllEvent() {
    this.router.navigate(['event-list']);
  }
  onSurveyClick(survey: any): void {
    window.location.href = survey.link;
  }
  viewSlsbList(eventId: any) {
    this.router.navigate(['slab', eventId]);
  }
}
