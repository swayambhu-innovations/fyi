import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderWithBackComponent } from '../../../sharedComponent/header-with-back/header-with-back.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { CatalogueService } from '../service/catalogue.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CommonModule } from '@angular/common';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category.component';
import { AddDonationItemComponent } from '../add-donation-item/add-donation-item.component';
import { DonationItemService } from '../../donation/service/donation-item.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-catalogue',
  standalone: true,
  imports: [
    HeaderWithBackComponent,
    FormsModule,
    CancelBtnComponent,
    SaveBtnComponent,
    MatExpansionModule,
    MatSlideToggleModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-catalogue.component.html',
  styleUrl: './create-catalogue.component.scss',
})
export class CreateCatalogueComponent {
  catalogueId: string = '';
  catalogueName: any;
  readonly panelOpenState = signal(false);
  categoryList: any[] = [];
  subCategoryList: { [key: string]: any[] } = {};
  donationItemList: { [key: string]: any[] } = {};
  activeDonationItemList: any[] = [];

  catalogueForm: FormGroup = new FormGroup({
    id: new FormControl(this.catalogueId),
    active: new FormControl(true),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private CatalogueService: CatalogueService,
    private _bottomSheet: MatBottomSheet,
    private DonationItemService: DonationItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      if (params.get('id')!='') {
        this.catalogueId = params.get('id') || '';
        this.catalogueForm.patchValue({ id: this.catalogueId });
        this.catalogueForm.setValue(this.CatalogueService.currentCatalogue);
      }
    });
    this.getCategoryList();
    this.activeDonationItems();
  }

  addCatalogue() {
    console.log(this.catalogueForm.value);
    if (this.catalogueForm.valid) {
      this.CatalogueService.addCatalogue(this.catalogueForm.value).then(
        (res) => {
          this.catalogueForm.patchValue({ id: res.id });
        }
      );
    }
  }
  cancel() {
    console.log('cancel');
  }

  async addCategory() {
    await this._bottomSheet.open(AddCategoryComponent, {
      data: this.catalogueForm.value,
    });
    this.getCategoryList();
  }
  addSubCategory(categoryId: string): void {
    this._bottomSheet.open(AddSubCategoryComponent, {
      data: {
        catalogueId: this.catalogueForm.value.id,
        categoryId: categoryId,
      },
    });
  }
  addDonationItem(categoryId: string, subCategoryId: string) {
    this._bottomSheet.open(AddDonationItemComponent, {
      data: {
        catalogueId: this.catalogueForm.value.id,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
      },
    });
  }

  getCategoryList() {
    this.CatalogueService.getCategoryList(
      this.catalogueForm.value.id
    ).subscribe((data: any) => {
      this.categoryList = data;
    });
  }

  getSubCategory(categoryId: string) {
    console.log(this.catalogueForm.value.id, categoryId);
    this.CatalogueService.getSubCategoryList(
      this.catalogueForm.value.id,
      categoryId
    ).subscribe((data: any) => {
      console.log(data);
      this.subCategoryList[categoryId] = data;
      console.log(this.subCategoryList);
    });
  }
  getDonationItemList(categoryId: string, subCategoryId: string) {
    console.log(this.catalogueForm.value.id, categoryId);

    this.CatalogueService.getDonationItemList(
      this.catalogueForm.value.id,
      categoryId,
      subCategoryId
    ).subscribe((data: any) => {
      console.log(data);
      this.donationItemList[subCategoryId] = data;
      console.log(this.donationItemList);
    });
  }

  loadSubcategories(categoryId: string) {
    this.panelOpenState.set(true);
    this.getSubCategory(categoryId);
  }
  loadDonationItemList(categoryId: string, subCategoryId: string) {
    this.panelOpenState.set(true);
    this.getDonationItemList(categoryId, subCategoryId);
  }
  updatedStatus(categoryDetail: any) {
    categoryDetail.active = !categoryDetail.active;
    this.CatalogueService.addCategory(categoryDetail);
  }

  activeDonationItems() {
    this.DonationItemService.getDonationItems().subscribe((data: any) => {
      data.map((item: any) => {
        if (item['active']) {
          this.activeDonationItemList.push(item);
        }
      });
    });
  }

  donationItemIsActive(itemId: string): boolean {
    console.log(itemId);
    const item = this.activeDonationItemList.find((d) => d.itemId === itemId);
    console.log(this.activeDonationItemList);

    return item ? item.active : false;
  }
  getNameOfItem(itemId: string): string {
    const item = this.activeDonationItemList.find((d) => d.itemId === itemId);

    console.log(item);
    return item ? item.itemName : 'Item not found';
  }
}
