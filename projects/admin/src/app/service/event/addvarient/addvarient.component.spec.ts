import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvarientComponent } from './addvarient.component';

describe('AddvarientComponent', () => {
  let component: AddvarientComponent;
  let fixture: ComponentFixture<AddvarientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddvarientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvarientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
