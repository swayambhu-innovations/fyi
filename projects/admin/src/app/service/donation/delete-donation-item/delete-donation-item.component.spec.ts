import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDonationItemComponent } from './delete-donation-item.component';

describe('DeleteDonationItemComponent', () => {
  let component: DeleteDonationItemComponent;
  let fixture: ComponentFixture<DeleteDonationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDonationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDonationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
