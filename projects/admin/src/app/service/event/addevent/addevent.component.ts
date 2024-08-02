import { NgIf, CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { LoadingService } from '../../../../../../shared-ui/src/lib/spinner/loading.service';
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
import { Location } from '@angular/common';

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
  selected = 'details';
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
    private Location: Location,
    private route: ActivatedRoute,
    private LoadingService: LoadingService
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
    this.LoadingService.show();
    this.route.paramMap.subscribe(async (params) => {
      if (params.get('id') !== null) {
        this.eventForm.value.eventId = params.get('id') || '';
        await this.eventservice
          .eventDetail(this.eventForm.value.eventId)
          .subscribe((res: any) => {
            this.eventForm.patchValue({
              active: res.active,
              description: res.description,
              endDate: res.endDate,
              eventId: res.eventId,
              eventName: res.eventName,
              startDate: res.startDate,
            });
            this.setImages(res.images);
          });

        this.eventservice
          .itineraryOfEvent(this.eventForm.value.eventId)
          .subscribe((res: any) => {
            this.itineraryForm.setControl(
              'activities',
              this.fb.array(
                res.activities.map((activity: any) => this.fb.group(activity))
              )
            );
            this.itineraryForm.patchValue({ eventId: res.eventId });
          });

        this.eventservice
          .getSlabAndVariantOfEvent(this.eventForm.value.eventId)
          .subscribe((res: any) => {
            this.resetSlabForm(res);
          });
      }
      this.LoadingService.hide();
    });
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
      active: [true],
      variants: this.fb.array([], this.atLeastOneImageValidator()),
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
    const slabsArray = this.slabAndVariantForm.get('slabs') as FormArray;

    data.forEach((slab: any) => {
      const slabGroup = this.fb.group({
        name: [slab.name, Validators.required],
        description: [slab.description, Validators.required],
        startDate: [slab.startDate, Validators.required],
        endDate: [slab.endDate, Validators.required],
        image: [slab.image, Validators.required],
        slabId: [slab.slabId],
        active: [slab.active],
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
          active: [variant.active, Validators.required],
          variantId: [variant.variantId || ''],
        });
        variantsArray.push(variantGroup);
      });

      slabsArray.push(slabGroup);
    });
  }

  // Call the setFormData method with the response data

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

  async removeSlab(index: any, slab: any) {
    this.slabs.removeAt(index);
    if (slab.value.slabId) {
      console.log(slab.value.slabId);
      await this.eventservice.deleteSlab(
        `events/${this.eventForm.value.eventId}/slab-variant/${slab.value.slabId}`
      );
    }
  }
  editVariant(slabIndex: any, variant: any, variantIndex: any) {
    const bottomSheetRef = this._bottomSheet.open(AddvarientComponent, {
      data: variant,
    });

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      if (result) {
        this.updateVariant(slabIndex, variantIndex, result);
      } else {
      }
    });
  }
  updateVariant(
    slabIndex: number,
    variantIndex: number,
    updatedVariantData: any
  ): void {
    const variantsArray = this.getVariants(slabIndex);

    if (variantsArray) {
      const variantGroup = variantsArray.at(variantIndex) as FormGroup;

      if (variantGroup) {
        variantGroup.patchValue({
          name: updatedVariantData.name,
          price: updatedVariantData.price,
          taxType: updatedVariantData.taxType,
          taxCalc: updatedVariantData.taxCalc,
          totalTicket: updatedVariantData.totalTicket,
          reward: updatedVariantData.reward,
          active: updatedVariantData.active,
          variantId: updatedVariantData.variantId,
        });
      } else {
        console.error('Variant FormGroup not found');
      }
    } else {
      console.error('Variants FormArray not found');
    }
  }

  async removaVariant(
    slab: any,
    slabIndex: any,
    variant: any,
    variantIndex: any
  ) {
    console.log(slab, variant);
    (this.slabs.at(slabIndex).get('variants') as FormArray)?.removeAt(
      variantIndex
    );
    if (variant.variantId) {
      await this.eventservice.delete(
        `events/${this.eventForm.value.eventId}/slab-variant/${slab.value.slabId}/variants/${variant.variantId}`
      );
    }
  }
  async changeStatusOfVariant(slab: any, variant: any) {
    variant.active = !variant.active;
    if (variant.variantId) {
      this.eventservice.changeStatusOfVariant(
        this.eventForm.value.eventId,
        slab.value.slabId,
        variant.variantId,
        variant.active
      );
    }
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
      description: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
    this.activities.push(activityGroup);
  }
  deleteActivity(index: number): void {
    this.activities.removeAt(index);
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

  openBottomSheet(slabIndex: number): void {
    const bottomSheetRef = this._bottomSheet.open(AddvarientComponent);

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      if (result) {
        this.addVariant(slabIndex, result);
      } else {
      }
    });
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
            this.selected = view
          });
        }
        break;
      case 'slab':
        if (
          this.itineraryForm.valid &&
          this.itineraryForm.value.activities.length > 0
        ) {
          this.eventservice
            .addItinerary(this.itineraryForm.value)
            .then(() => {});
          this.pannel = view;
          this.selected = view

        }
        break;
      case 'back':
        console.log(this.slabAndVariantForm.value);
        if (this.slabAndVariantForm.valid) {
          this.LoadingService.show();
          await this.eventservice
            .addSlabAndVariant(this.slabAndVariantForm.value)
            .then(() => {
              this.getCities();
            });
          // this.pannel = view;
          // this.selected = view
          this.cancel('back')

        }
        break;
      
    }
  }
  getCities(): any {
    this.eventservice.getCities().then((res: any) => {
      this.cities = res;
      this.getCitiesOfEvent(this.eventForm.value.eventId);
      this.LoadingService.hide();
    });
    return '';
  }

  selectCity(newCity: any) {
    const eventId = this.eventForm.value.eventId;

    const cityExists = this.CitiesOfEvent.some(
      (city: any) =>
        city.cityId === newCity.cityId && city.stateId === newCity.stateId
    );
    if (cityExists) {
      
    } else {

      this.eventservice
        .addEventInCity({
          ...newCity,
          active: true,
          eventId: eventId,
        })
        .then((res: any) => {
        
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
    this.LoadingService.show();
    this.eventservice.getCitiesOfEvent(eventId).subscribe(async (res: any) => {
      this.CitiesOfEvent = await this.filterActiveCities(res);
      this.LoadingService.hide();
    });
  }

  async filterActiveCities(citiesOfEvent: any[]): Promise<any[]> {
    let activeCities: any[] = [];

    try {
      const allCities = await this.eventservice.getCities();

      if (Array.isArray(allCities)) {
      } else {
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

  async removeCity(city: any) {
    const bottomSheetRef = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: {
        title: 'City',
        description: `Are you sure ?`,
      },
    });

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      if (result) {
        await this.eventservice.deleteCity(city);
      }
    });
  }
  cancel(panel: any) {
    if (panel == 'back') {
      this.Location.back();
    }
    this.selected = panel;
    this.pannel = panel;
  }
  changeStatusOfSlab(slab: any) {
    console.log(slab.value);
    this.eventservice.changeStatusOfSlab(
      this.eventForm.value.eventId,
      slab.value.slabId,
      !slab.value.active
    );
  }
  resetSlabForm(slabDetail: any) {
    const slabsArray = this.slabAndVariantForm.get('slabs') as FormArray;
    while (slabsArray.length !== 0) {
      slabsArray.removeAt(0);
    }

    this.slabAndVariantForm.reset();
    this.setFormData(slabDetail);
    this.slabAndVariantForm.patchValue({
      eventId: this.eventForm.value.eventId,
    });
  }
}
