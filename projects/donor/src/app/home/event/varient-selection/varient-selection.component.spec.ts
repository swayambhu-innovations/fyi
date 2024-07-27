import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarientSelectionComponent } from './varient-selection.component';

describe('VarientSelectionComponent', () => {
  let component: VarientSelectionComponent;
  let fixture: ComponentFixture<VarientSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarientSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarientSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
