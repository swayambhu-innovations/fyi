import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaxComponent } from './delete-tax.component';

describe('DeleteTaxComponent', () => {
  let component: DeleteTaxComponent;
  let fixture: ComponentFixture<DeleteTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
