import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSlabComponent } from './delete-slab.component';

describe('DeleteSlabComponent', () => {
  let component: DeleteSlabComponent;
  let fixture: ComponentFixture<DeleteSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSlabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
