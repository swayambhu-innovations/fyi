import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthCityComponent } from './un-auth-city.component';

describe('UnAuthCityComponent', () => {
  let component: UnAuthCityComponent;
  let fixture: ComponentFixture<UnAuthCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
