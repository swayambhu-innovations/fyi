import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithMenuComponent } from './header-with-menu.component';

describe('HeaderWithMenuComponent', () => {
  let component: HeaderWithMenuComponent;
  let fixture: ComponentFixture<HeaderWithMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderWithMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderWithMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
