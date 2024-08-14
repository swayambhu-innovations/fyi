import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutModelComponent } from './logout-model.component';

describe('LogoutModelComponent', () => {
  let component: LogoutModelComponent;
  let fixture: ComponentFixture<LogoutModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
