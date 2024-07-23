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
import { DeleteBottomSheetComponent } from '../../../sharedComponent/delete-bottom-sheet/delete-bottom-sheet.component';
import { Location } from '@angular/common';
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
  categoryList: any[] = [];
  subCategoryList: { [key: string]: any[] } = {};
  donationItemList: { [key: string]: any[] } = {};
  activeDonationItemList: any[] = [];
  panelOpenSubcategory: Map<string, boolean> = new Map();
  panelOpenCategory: Map<string, boolean> = new Map();


  catalogueForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    active: new FormControl(true),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private CatalogueService: CatalogueService,
    private _bottomSheet: MatBottomSheet,
    private DonationItemService: DonationItemService,
    private location: Location
  ) {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id') !== null) {
        console.log('param', params.get('id'));
        this.catalogueId = params.get('id') || '';
        this.catalogueForm.patchValue({ id: this.catalogueId });
        this.catalogueForm.setValue(this.CatalogueService.currentCatalogue);
      }
    });
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.activeDonationItems();
  }

  addCatalogue() {
    if (this.catalogueForm.valid) {
      this.CatalogueService.addCatalogue(this.catalogueForm.value).then(
        (res) => {
          this.catalogueForm.patchValue({ id: res.id });
        }
      );
    }
  }
  cancel() {
    this.location.back();
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
    if (this.catalogueForm.value.id) {
      this.CatalogueService.getCategoryList(
        this.catalogueForm.value.id
      ).subscribe((data: any) => {
        this.categoryList = data;

        this.categoryList.map((category: any) => {
          if (category.categoryId) {
            this.getSubCategory(category.categoryId);
          }
        });
      });
    }
  }

  getSubCategory(categoryId: string) {
    this.CatalogueService.getSubCategoryList(
      this.catalogueForm.value.id,
      categoryId
    ).subscribe((data: any) => {
      this.subCategoryList[categoryId] = data;
      this.subCategoryList[categoryId].map((subCategory: any) => {
        this.getDonationItemList(categoryId, subCategory.subCategoryId);
      });
    });
  }
  getDonationItemList(categoryId: string, subCategoryId: string) {
    this.CatalogueService.getDonationItemList(
      this.catalogueForm.value.id,
      categoryId,
      subCategoryId
    ).subscribe((data: any) => {
      this.donationItemList[subCategoryId] = [];
      if (!this.donationItemList[subCategoryId]) {
        this.donationItemList[subCategoryId] = [];
      }

      data.map((item: any) => {
        if (this.donationItemIsActive(item.itemId)) {
          this.donationItemList[subCategoryId].push(item);
        }
      });
    });
  }

  updatedStatus(categoryDetail: any) {
    categoryDetail.active = !categoryDetail.active;
    this.CatalogueService.addCategory(categoryDetail);
  }
  updatedStatusOfSubcategory(subCategory: any) {
    subCategory.active = !subCategory.active;
    this.CatalogueService.addSubCategory(subCategory);
  }

  editCategory(category: any) {
    this._bottomSheet.open(AddCategoryComponent, {
      data: category,
    });
  }

  editSubCategory(subCategory: any) {
    this._bottomSheet.open(AddSubCategoryComponent, {
      data: subCategory,
    });
  }
  editDonationItemDetail(donationItem: any) {
    this._bottomSheet.open(AddDonationItemComponent, {
      data: donationItem,
    });
  }

  activeDonationItems() {
    this.DonationItemService.getDonationItems().subscribe((data: any) => {
      this.activeDonationItemList = [];
      data.map((item: any) => {
        if (item['active']) {
          this.activeDonationItemList.push(item);
        }
      });
    });
  }

  donationItemIsActive(itemId: string): boolean {
    const item = this.activeDonationItemList.find((d) => d.itemId === itemId);

    return item ? item.active : false;
  }
  getNameOfItem(itemId: string): string {
    const item = this.activeDonationItemList.find((d) => d.itemId === itemId);

    return item ? item.itemName : 'Item not found';
  }

  async deleteCategory(category: any) {
    const bottomSheetRef = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: {
        title: 'Category',
        description: `Are you sure ?`,
      },
    });

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      console.log('Bottom sheet has been dismissed', result);
      if (result) {
        await this.CatalogueService.delete(
          `service-catalogue/${category.catalogueId}/categories/${category.categoryId}`
        );
      }
    });
  }
  async deleteSubcategory(subCategory: any) {
    const bottomSheetRef = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: {
        title: 'Sub Category',
        description: `Are you sure ?`,
      },
    });

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      console.log('Bottom sheet has been dismissed', result);
      if (result) {
        await this.CatalogueService.delete(
          `service-catalogue/${subCategory.catalogueId}/categories/${subCategory.categoryId}/sub-categories/${subCategory.subCategoryId}`
        );
      }
    });
  }

  async removeDonationItem(donationItem: any) {
    const bottomSheetRef = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: {
        title: 'Donation Item',
        description: `Are you sure ?`,
      },
    });

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      console.log('Bottom sheet has been dismissed', result);
      if (result) {
        await this.CatalogueService.delete(
          `service-catalogue/${donationItem.catalogueId}/categories/${donationItem.categoryId}/sub-categories/${donationItem.subCategoryId}/donation-items/${donationItem.donationItemId}`
        );
      }
    });
  }
}
