import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithBackComponent } from './header-with-back.component';

describe('HeaderWithBackComponent', () => {
  let component: HeaderWithBackComponent;
  let fixture: ComponentFixture<HeaderWithBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderWithBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderWithBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
