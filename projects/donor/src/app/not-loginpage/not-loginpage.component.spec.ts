import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLoginpageComponent } from './not-loginpage.component';

describe('NotLoginpageComponent', () => {
  let component: NotLoginpageComponent;
  let fixture: ComponentFixture<NotLoginpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotLoginpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotLoginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
