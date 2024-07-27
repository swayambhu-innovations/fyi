import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatalogueComponent } from './create-catalogue.component';

describe('CreateCatalogueComponent', () => {
  let component: CreateCatalogueComponent;
  let fixture: ComponentFixture<CreateCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
