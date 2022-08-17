import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewHighDetailsComponent } from './card-view-high-details.component';

describe('CardViewHighDetailsComponent', () => {
  let component: CardViewHighDetailsComponent;
  let fixture: ComponentFixture<CardViewHighDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewHighDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardViewHighDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
