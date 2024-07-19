import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndPermissionComponent } from './user-and-permission.component';

describe('UserAndPermissionComponent', () => {
  let component: UserAndPermissionComponent;
  let fixture: ComponentFixture<UserAndPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAndPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAndPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
