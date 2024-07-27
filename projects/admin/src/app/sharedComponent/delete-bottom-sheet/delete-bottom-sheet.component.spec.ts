import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBottomSheetComponent } from './delete-bottom-sheet.component';

describe('DeleteBottomSheetComponent', () => {
  let component: DeleteBottomSheetComponent;
  let fixture: ComponentFixture<DeleteBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
