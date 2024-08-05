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
  isEventPresent: boolean = false;
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
    private DataProviderService: DataProviderService,
    private EventService:EventService,
  ) {}

  ngOnInit(): void {
    
        if (!this.eventService.getUsersFetched()) {
          this.loadingService.show()
          this.getEvent();
          this.eventService.getUsersFetched.set(true);
        } 
  }
  async getEvent() {    

    // let stateId = localStorage.getItem('stateDocId');
    // let cityId = localStorage.getItem('cityDocId');
    // let cityAddress = '';

    //   if (!this.DataProviderService.loggedIn) {
    //     stateId = localStorage.getItem('stateDocId');
    //     cityId = localStorage.getItem('cityDocId');
    //     cityAddress = `city-catalogue/${stateId}/city/${cityId}`;
    //   } else {
    //     console.log('this.DataProviderService.currentUser', this.DataProviderService.currentUser);
    //     let uid = this.DataProviderService.currentUser?.userData.uid;
    //     const addressList = await firstValueFrom(
    //       this.eventService.fetchDocs(`users/${uid}/addresses`)
    //     );
    //     this.eventService.addressList.set(addressList);

    //     for (const address of addressList) {
    //       if (address.active) {
    //         this.eventService.activeAddress.set(address);
    //         stateId = address.selectedStateId;
    //         cityId = address.selectedCityId;
    //         cityAddress = `city-catalogue/${stateId}/city/${cityId}`;
    //       }
    //     }
    //   }
    // console.log('cityAddress', cityAddress);
    try {
      const eventDocs: any = await firstValueFrom(
        this.eventService.fetchDocs('events')
      );

      const eventList: any[] = [];
      const itineraryList: { [key: string]: any[] } = {};
      const slabList: { [key: string]: any[] } = {};
      const variantList: { [key: string]: any[] } = {};

      for (let currEvent of eventDocs) {

        const event: any = await firstValueFrom(
          this.eventService.fetchDoc(`events/${currEvent['eventId']}`)
        );
        if (event.active) {
          const itinerary: any = await firstValueFrom(
            this.eventService.fetchDoc(
              `events/${currEvent['eventId']}/itinerary/activities`
            )
          );
          itineraryList[currEvent['eventId']] = itinerary;
          this.eventService.itineraryList.set(itineraryList);

          const slabs: any[] = await firstValueFrom(
            this.eventService.fetchDocs(
              `events/${currEvent['eventId']}/slab-variant`
            )
          );

          slabList[currEvent['eventId']] = [];

          for (const slab of slabs) {
            const slabDetail: any = await firstValueFrom(
              this.eventService.fetchDoc(
                `events/${currEvent['eventId']}/slab-variant/${slab.slabId}`
              )
            );
            if (slabDetail.active) {
              const variants: any[] = await firstValueFrom(
                this.eventService.fetchDocs(
                  `events/${currEvent['eventId']}/slab-variant/${slab.slabId}/variants`
                )
              );
              variantList[slab.slabId] = [];

              for (const variant of variants) {
                const variantDetail: any = await firstValueFrom(
                  this.eventService.fetchDoc(
                    `events/${currEvent['eventId']}/slab-variant/${slab.slabId}/variants/${variant.variantId}`
                  )
                );

                await this.isTaxActive(variantDetail?.['taxType']).then(
                  (res: any) => {
                    if (variantDetail.active && res) {
                      variantList[slab.slabId].push(variantDetail);
                      this.eventService.variantList.set(variantList);
                    }
                  }
                );

                this.loadingService.hide();
              }

              if (variantList[slab.slabId].length > 0) {
                slabList[currEvent['eventId']].push(slabDetail);
                this.eventService.slabList.set(slabList);
              }
            }
          }
          if (slabList[currEvent['eventId']].length > 0) {
            eventList.push(event);
            this.isEventPresent = true;
            this.eventService.eventList.set(eventList);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      this.loadingService.hide();
    }
  }

  async isTaxActive(taxId: any) {
    let res: any;
    try {
      const observable = this.eventService.fetchDoc(`tax-types/${taxId}`);
      const response = await firstValueFrom(observable);
      res = response.active;
    } catch (error) {
      console.error('Error fetching tax type:', error);
      res = false;
    }
    return res;
  }

  seeAllEvent() {
    this.router.navigate(['event-list']);
  }
  onSurveyClick(survey: any): void {
    window.location.href = survey.link;
  }
  

  viewSlsbList(eventId: any,event:any) {
    let bookingDetails =this.EventService.bookingDetails()
    bookingDetails['event'] = event;
    this.EventService.bookingDetails.set(bookingDetails);
    this.router.navigate(['slab', eventId]);
  }
}
