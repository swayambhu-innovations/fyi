import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlabListComponent } from './slab-list.component';

describe('SlabListComponent', () => {
  let component: SlabListComponent;
  let fixture: ComponentFixture<SlabListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlabListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
