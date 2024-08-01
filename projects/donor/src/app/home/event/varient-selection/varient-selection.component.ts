import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from '../../../sharedComponent/header-with-back/header-with-back.component';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-varient-selection',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './varient-selection.component.html',
  styleUrl: './varient-selection.component.scss',
})
export class VarientSelectionComponent {
  constructor(
    private router: Router,
    private ActivateRouted: ActivatedRoute,
    public EventService: EventService
  ) {
    this.ActivateRouted.paramMap.subscribe(async (params: any) => {
      if (params.get('id') !== null) {
        this.slabId = params.get('id') || '';
      }
    });
    if(!this.EventService.bookingDetails()['slab']){
      this.router.navigate(['/home'])
    }
  }
  slabId: any;
  events = [
    {
      title: 'Cearic Kashi Summit 2024',
      image: '/assets/homepage/varient_slider.svg',
    },
    {
      title: 'Cearic Kashi Summit 2025',
      image: '/assets/homepage/varient_slider.svg',
    },
    {
      title: 'Cearic Kashi Summit 2026',
      image: '/assets/homepage/varient_slider.svg',
    },
    {
      title: 'Cearic Kashi Summit 2027',
      image: '/assets/homepage/varient_slider.svg',
    },
    // Add more surveys here
  ];
  items = [
    { title: 'Rotracter', price: 6010 },
    { title: 'Rotarians', price: 6010 },
    { title: 'Couples', price: 6010 },
  ];

  selectedTab: string = 'description'; // Default tab
  descriptionContent: string =
    'This is the description content. It should be visible when the Description tab is clicked.';
  itineraryContent: string =
    'This is the itinerary content. It should be visible when the Itinerary tab is clicked.';

  selectedButtonIndex: number | null = null;
  quantities: number[] = [];

  slabDetail:any
  slabDescription:any
  itinerary:any

  ngOnInit(){
    this.slabDetail=this.EventService.bookingDetails()['slab']
    let curEvent = this.EventService.bookingDetails()['event'].eventId
    let itineraryList :any = this.EventService.itineraryList()[curEvent]
    this.itinerary=  this.groupAndSortActivities(itineraryList['activities'])
    console.log(this.slabDetail)
    console.log(this.itinerary)

  }

  convertTo12Hour(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1);
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  groupAndSortActivities(activities: any[]): any {
    const groupedActivities = activities.reduce((acc, activity) => {
      const { date } = activity;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {});
  
    // Sort activities by startTime within each date
    for (const date in groupedActivities) {
      groupedActivities[date].sort((a:any, b:any) => {
        const timeA = this.convertTo12Hour(a.startTime);
        const timeB = this.convertTo12Hour(b.startTime);
        return timeA.localeCompare(timeB);
      });
  
      // Convert startTime and endTime to 12-hour format
      groupedActivities[date] = groupedActivities[date].map((activity:any) => ({
        ...activity,
        startTime: this.convertTo12Hour(activity.startTime),
        endTime: this.convertTo12Hour(activity.endTime)
      }));
    }
  
    // Sort grouped activities by date
    const sortedGroupedActivities = Object.keys(groupedActivities)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .reduce((acc:any, date:any) => {
        acc[date] = groupedActivities[date];
        return acc;
      }, {});
  
    return sortedGroupedActivities;
  }


  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  memberform(index: number, variant: any) {
    let bookingDetails = this.EventService.bookingDetails();
    bookingDetails['variant'] = variant;
    this.EventService.bookingDetails.set(bookingDetails);

    this.selectedButtonIndex = index;
    this.quantities[index] = 1;
  }

  increaseQuantity(index: number) {
    if (this.quantities[index] < 99) {
      this.quantities[index]++;
    }
  }

  decreaseQuantity(index: number) {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }

  removeSelection() {
    this.selectedButtonIndex = null;
  }
  goToNextPage() {
    const index =
      this.selectedButtonIndex !== null ? this.selectedButtonIndex : 0;
    let bookingDetails = this.EventService.bookingDetails();
    bookingDetails.totalMember = this.quantities[index];
    this.EventService.bookingDetails.set(bookingDetails);

    this.router.navigate(['member-detail']);
  }







  schedule = [
    {
      day: 'DAY 1 (27 September 2024)',
      events: [
        { time: '11:00 A.M. - 12:00 P.M.', description: 'CHECK IN & REGISTRATIONS' },
        { time: '12:00 P.M. - 01:00 P.M.', description: 'LUNCH' },
        { time: '01:00 P.M. - 01:30 P.M.', description: 'INAUGURAL SESSION' },
        { time: '03:30 P.M. - 04:00 P.M.', description: 'HI-TEA' },
        { time: '04:00 P.M. - 08:00 P.M.', description: 'CITY TOUR 1 (RIVER CRUISE & GANGA AARTI)' },
        { time: '08:00 P.M. - 09:00 P.M.', description: 'DINNER' },
      ]
    },
    {
      day: 'DAY 2 (27 September 2024)',
      events: [
        { time: '11:00 A.M. - 12:00 P.M.', description: 'CHECK IN & REGISTRATIONS' },
        { time: '12:00 P.M. - 01:00 P.M.', description: 'LUNCH' },
        { time: '01:00 P.M. - 01:30 P.M.', description: 'INAUGURAL SESSION' },
        { time: '03:30 P.M. - 04:00 P.M.', description: 'HI-TEA' },
        { time: '04:00 P.M. - 08:00 P.M.', description: 'CITY TOUR 1 (RIVER CRUISE & GANGA AARTI)' },
        { time: '08:00 P.M. - 09:00 P.M.', description: 'DINNER' },
      ]
    }
  ];
}
