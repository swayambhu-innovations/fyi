import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberDetailComponent } from './edit-member-detail.component';

describe('EditMemberDetailComponent', () => {
  let component: EditMemberDetailComponent;
  let fixture: ComponentFixture<EditMemberDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMemberDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
