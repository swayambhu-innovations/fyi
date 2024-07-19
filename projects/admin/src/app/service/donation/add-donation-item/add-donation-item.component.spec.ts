import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDonationItemComponent } from './add-donation-item.component';

describe('AddDonationItemComponent', () => {
  let component: AddDonationItemComponent;
  let fixture: ComponentFixture<AddDonationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDonationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDonationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
