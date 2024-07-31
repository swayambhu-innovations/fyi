import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingEventComponent } from './receiving-event.component';

describe('ReceivingEventComponent', () => {
  let component: ReceivingEventComponent;
  let fixture: ComponentFixture<ReceivingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivingEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
