import { NgIf, CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddvarientComponent } from '../addvarient/addvarient.component';
import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';
import { Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteBottomSheetComponent } from '../../../sharedComponent/delete-bottom-sheet/delete-bottom-sheet.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventService } from '../service/event.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderWithBackComponent } from '../../../sharedComponent/header-with-back/header-with-back.component';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {Location} from '@angular/common';

interface Event {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  images1: string[];
  variants: { name: string; price: number; isActive: boolean }[];
}

@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [
    NgIf,
    CancelBtnComponent,
    HeaderWithBackComponent,
    SaveBtnComponent,
    CommonModule,
    NgFor,
    MatAccordion,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatSlideToggle,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.scss',
  providers: [EventService],
})
export class AddeventComponent {
  selected = '';
  pannel = 'details';
  images: string[] = [];
  uploadPercent: number = 0;
  cities: any[] = [];
  filteredCities: any[] = [];
  searchQuery: string = '';

  itineraryForm: FormGroup;
  eventForm: FormGroup;
  slabAndVariantForm: FormGroup;

  constructor(
    private router: Router,
    private storage: Storage,
    private _bottomSheet: MatBottomSheet,
    private fb: FormBuilder,
    private eventservice: EventService,
    private Location:Location
  ) {
    this.slabAndVariantForm = this.fb.group({
      slabs: this.fb.array([], this.atLeastOneImageValidator()),
      eventId: [''],
    });
    this.itineraryForm = this.fb.group({
      activities: this.fb.array([], this.atLeastOneImageValidator()),
      eventId: [''],
    });

    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      eventId: [''],
      active: [true],
      images: this.fb.array([], this.atLeastOneImageValidator()),
    });
    // this.setInitialValues();
  }
  get slabs(): FormArray {
    return (
      (this.slabAndVariantForm.get('slabs') as FormArray) ?? this.fb.array([])
    );
  }

  addSlab(): void {
    const slab = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      image: ['', Validators.required],
      slabId: [''],
      variants: this.fb.array([]),
    });
    this.slabs.push(slab);
  }
  getVariants(slabIndex: number): FormArray {
    const slabGroup = this.slabs.at(slabIndex) as FormGroup;
    return slabGroup.get('variants') as FormArray;
  }

  addVariant(slabIndex: number, variant: any): void {
    const variantsArray = this.getVariants(slabIndex);

    if (variantsArray) {
      const variantGroup = this.fb.group({
        name: [variant.name, Validators.required],
        price: [variant.price, Validators.required],
        taxType: [variant.taxType, Validators.required],
        taxCalc: [variant.taxCalc, Validators.required],
        totalTicket: [variant.totalTicket, Validators.required],
        reward: [variant.reward, Validators.required],
        active: [variant.active, Validators.required],
        variantId: [variant.variantId],
      });
      variantsArray.push(variantGroup);
    } else {
      console.error('Variants FormArray not found');
    }
  }

  setFormData(data: any) {
    data.forEach((item: any) => {
      const slabsArray = this.slabAndVariantForm.get('slabs') as FormArray;

      item.slabs.forEach((slab: any) => {
        const slabGroup = this.fb.group({
          name: [slab.name, Validators.required],
          description: [slab.description, Validators.required],
          startDate: [slab.startDate, Validators.required],
          endDate: [slab.endDate, Validators.required],
          image: [slab.image, Validators.required],
          slabId: [slab.slabId],
          variants: this.fb.array([]),
        });
        const variantsArray = slabGroup.get('variants') as FormArray;
        slab.variants.forEach((variant: any) => {
          const variantGroup = this.fb.group({
            name: [variant.name, Validators.required],
            price: [variant.price, Validators.required],
            taxType: [variant.taxType, Validators.required],
            taxCalc: [variant.taxCalc, Validators.required],
            totalTicket: [variant.totalTicket, Validators.required],
            reward: [variant.reward, Validators.required],
            active: [variant.active || true, Validators.required],
            variantId: [variant.variantId || ''],
          });
          variantsArray.push(variantGroup);
        });
        slabsArray.push(slabGroup);
      });
      console.log(this.slabAndVariantForm.value);

      this.slabAndVariantForm.patchValue({ eventId: item.eventId });
    });
  }

  async changePhoto(e: any, index: any) {
    const file = e.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;

    // if (fileSizeKB > maxSizeKB) {
    //   this.isImgSizeValid = true;
    //   return;
    // } else {
    // this.isImgSizeValid = false;

    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `${timestamp}.${file.name.split('.').pop()}`;

    const filePath = `donotionItem/${fileName}`;
    await uploadBytesResumable(ref(this.storage, filePath), file);
    const fileUrl = await getDownloadURL(ref(this.storage, filePath));
    (this.slabs.at(index) as FormGroup).patchValue({
      image: fileUrl,
    });
  }

  removeSlab(index:any,slab:any){
    this.slabs.removeAt(index);
  }
  removeImageOfSlab(slabIndex: number): void {
    const slab = (this.slabs.at(slabIndex) as FormGroup) ?? this.fb.group({});
    slab.patchValue({ image: '' });
  }

  async uploadImageOfSlab(event: any, slabIndex: number) {
    const file = event.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;

    if (fileSizeKB > maxSizeKB) {
      // Handle file size validation if necessary
      return;
    }

    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `${timestamp}.${file.name.split('.').pop()}`;

    const filePath = `slab/${fileName}`;
    await uploadBytesResumable(ref(this.storage, filePath), file);
    const fileUrl = await getDownloadURL(ref(this.storage, filePath));

    const slab = (this.slabs.at(slabIndex) as FormGroup) ?? this.fb.group({});
    slab.patchValue({ image: fileUrl });
  }

  // setInitialValues(): void {
  //   const initialActivities = [
  //     { name: 'Activity 1', date: '2024-07-24', startTime: '10:00', endTime: '11:00' },
  //     { name: 'Activity 2', date: '2024-07-25', startTime: '12:00', endTime: '13:00' }
  //   ];
  //   this.itineraryForm.setControl('activities', this.fb.array(
  //     initialActivities.map(activity => this.fb.group(activity))
  //   ));
  // }
  atLeastOneImageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formArray = control as FormArray;
      return formArray.length > 0 ? null : { atLeastOneImage: true };
    };
  }
  get activities(): FormArray {
    return this.itineraryForm.get('activities') as FormArray;
  }
  addActivity(): void {
    const activityGroup = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
    this.activities.push(activityGroup);
  }
  deleteActivity(index: number): void {
    this.activities.removeAt(index);
  }

  ngOnInit() {
    this.getCities();
    //   this.setFormData([{
    //     eventId: '',
    //     slabs: [
    //       {

    //           description: "naksdng",
    //           endDate: "2024-07-15",
    //           image: "https://firebasestorage.googleapis.com/v0/b/fyi1-aa2c2.appspot.com/o/donotionItem%2F1721883955175.jpeg?alt=media&token=35856330-8faa-4103-9d23-8fb6f782e85f",
    //           name: "dnagkd",
    //           slabId: "",
    //           startDate: "2024-07-04",
    //           variants: [

    //             {
    //               name: "variant2",
    //               price: "34",
    //               taxType: "6GWEnA3iGt2iJfhDHDDS",
    //               taxCalc: "inclusive",
    //               totalTicket: "23423",
    //               active:true
    //             },
    //             {
    //               name: "variant2",
    //               price: "34",
    //               taxType: "6GWEnA3iGt2iJfhDHDDS",
    //               taxCalc: "inclusive",
    //               totalTicket: "23423",
    //               active:false
    //             }
    //           ]

    //       },
    //       {

    //           description: "naksdng",
    //           endDate: "2024-07-15",
    //           image: "https://firebasestorage.googleapis.com/v0/b/fyi1-aa2c2.appspot.com/o/donotionItem%2F1721883955175.jpeg?alt=media&token=35856330-8faa-4103-9d23-8fb6f782e85f",
    //           name: "dnagkd",
    //           slabId: "",
    //           startDate: "2024-07-04",
    //           variants: [

    //             {
    //               name: "variant2",
    //               price: "34",
    //               taxType: "6GWEnA3iGt2iJfhDHDDS",
    //               taxCalc: "inclusive",
    //               totalTicket: "23423",
    //               active:true
    //             },
    //             {
    //               name: "variant2",
    //               price: "34",
    //               taxType: "6GWEnA3iGt2iJfhDHDDS",
    //               taxCalc: "inclusive",
    //               totalTicket: "23423",
    //               active:false
    //             }
    //           ]

    //       }
    //     ]
    // },
    // ])

    // const images = [
    //   "https://firebasestorage.googleapis.com/v0/b/fyi1-aa2c2.appspot.com/o/event%2F1721814120108.jpeg?alt=media&token=985bcb30-2a40-477f-b0ea-1f35a867d773",
    //   "https://firebasestorage.googleapis.com/v0/b/fyi1-aa2c2.appspot.com/o/event%2F1721814141044.jpeg?alt=media&token=2f69390f-1f63-42e0-82f9-ad43b9765002"
    // ];
    // this.eventForm.patchValue({
    //   active: true,
    //   description: "event3",
    //   endDate: "2024-07-09",
    //   eventId: "BXqFFddAwzqbzWGocdzf",
    //   eventName: "event3",
    //   startDate: "2024-07-17"
    // });
    // this.setImages(images);
    // console.log(this.eventForm.value);
  }

  setImages(images: string[]) {
    const imageFormArray = this.eventForm.get('images') as FormArray;
    images.forEach((imageUrl) => {
      imageFormArray.push(this.fb.control(imageUrl));
    });
  }

  submit(select: string) {
    this.selected = select;
  }

  get imagesArray() {
    return this.eventForm.get('images') as FormArray;
  }

  addImageUrl(url: string) {
    this.imagesArray.push(new FormControl(url));
  }

  removeImage(index: number) {
    this.imagesArray.removeAt(index);
  }
  // Add a new image FormGroup to the FormArray
  // changePhoto() {
  //   this.imagesArray.push(this.createImage());
  // }

  async addImage(e: any) {
    const file = e.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;

    // if (fileSizeKB > maxSizeKB) {
    //   this.isImgSizeValid = true;
    //   return;
    // } else {
    //this.isImgSizeValid = false;

    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `${timestamp}.${file.name.split('.').pop()}`;

    const filePath = `event/${fileName}`;
    await uploadBytesResumable(ref(this.storage, filePath), file);
    const fileUrl = await getDownloadURL(ref(this.storage, filePath));
    this.addImageUrl(fileUrl);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  events: Event[] = [
    {
      name: 'Searic Kashi Summit 2024',
      description: '',
      startDate: '2024-07-13',
      endDate: '2024-07-15',
      images1: [],
      variants: [
        { name: 'Rotarian', price: 11201, isActive: true },
        { name: 'Couple', price: 21201, isActive: false },
      ],
    },
    {
      name: 'Another Event 2024',
      description: '',
      startDate: '2024-08-01',
      endDate: '2024-08-05',
      images1: [],
      variants: [
        { name: 'Single', price: 5000, isActive: true },
        { name: 'Group', price: 15000, isActive: false },
      ],
    },
  ];

  openBottomSheet(slabIndex: number): void {
    const bottomSheetRef = this._bottomSheet.open(AddvarientComponent);

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      if (result) {
        this.addVariant(slabIndex, result);
      } else {
        console.log('Catalogue is linked with areas');
      }
    });
  }
  removeImageslab(eventIndex: number, imageIndex: number) {
    this.events[eventIndex].images1.splice(imageIndex, 1);
  }
  async addImageinslab(e: any, eventIndex: any) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(async (file) => {
        const filePath = `event/${new Date().getTime()}`;
        await uploadBytesResumable(ref(this.storage, filePath), file);
        const fileUrl = await getDownloadURL(ref(this.storage, filePath));
        this.events[eventIndex].images1.push(fileUrl);
      });
    }
  }
  async nextpannel(view: string) {
    switch (view) {
      case 'itinerary':
        if (this.eventForm.valid) {
          this.eventservice.addEvent(this.eventForm.value).then((res) => {
            this.eventForm.patchValue({ eventId: res.eventId });
            this.itineraryForm.patchValue({ eventId: res.eventId });
            this.slabAndVariantForm.patchValue({ eventId: res.eventId });
            this.pannel = view;
          });
        }
        break;
      case 'slab':
        if (this.itineraryForm.valid) {
          this.eventservice
            .addItinerary(this.itineraryForm.value)
            .then(() => {});
          this.pannel = view;
        }
        break;
      case 'city':
        if (this.slabAndVariantForm.valid) {
          this.eventservice
            .addSlabAndVariant(this.slabAndVariantForm.value)
            .then(() => {});
          this.pannel = view;
        }
        break;
    }
    this.pannel = view;
  }
  getCities(): any {
    this.eventservice.getCities().then((res: any) => {
      this.cities = res;
      this.getCitiesOfEvent('EiTsybW5J9hUO6QiGM05');
    });
    return '';
  }

  selectCity(newCity: any) {
    const eventId = 'EiTsybW5J9hUO6QiGM05'
    const cityExists = this.CitiesOfEvent.some(
      (city: any) =>
        city.cityId === newCity.cityId && city.stateId === newCity.stateId
    );
    if (cityExists) {
      console.log('City already exists');
    } else {
      this.eventservice
        .addEventInCity({
          ...newCity,
          active: true,
          eventId: eventId
        })
        .then((res: any) => {
          console.log(res);
        });
      this.filteredCities = [];
      this.searchQuery = '';
    }
  }

  filterCities() {
    if (this.searchQuery) {
      let allCities = this.cities;
      this.filteredCities = allCities.filter(
        (city) =>
          city.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          city.state.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCities = [];
    }
  }
  CitiesOfEvent: any[] = [];
  getCitiesOfEvent(eventId: string) {
    this.eventservice.getCitiesOfEvent(eventId).subscribe(async (res: any) => {
      this.CitiesOfEvent = await this.filterActiveCities(res);
    });
  }

  async filterActiveCities(citiesOfEvent: any[]): Promise<any[]> {
    let activeCities: any[] = [];

    try {
      const allCities = await this.eventservice.getCities();

      if (Array.isArray(allCities)) {
        console.log('allCities is an array with length:', allCities.length);
      } else {
        console.error('allCities is not an array');
        return [];
      }

      for (const eventCity of citiesOfEvent) {
        const cityMatch = allCities.find((city: any) => {
          return (
            city.cityId === eventCity.cityId &&
            city.stateId === eventCity.stateId
          );
        });

        if (cityMatch) {
          activeCities.push(eventCity);
        }
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }

    return activeCities;
  }

  async removeCity(city:any) {
    console.log(city)
    const bottomSheetRef = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: {
        title: 'City',
        description: `Are you sure ?`,
      },
    });

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      console.log('Bottom sheet has been dismissed', result);
      if (result) {
        await this.eventservice.delete(
          `events/${city.eventId}/cities/${city.id}`
        );
      }
    });
  }
  cancel(panel:any){
    if(panel=='back'){
      this.Location.back()
    }
   this.pannel=panel

}
}
