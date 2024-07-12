import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxTypeComponent } from './add-tax-type.component';

describe('AddTaxTypeComponent', () => {
  let component: AddTaxTypeComponent;
  let fixture: ComponentFixture<AddTaxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaxTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
