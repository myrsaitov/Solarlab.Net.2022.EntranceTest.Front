import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewLowDetailsComponent } from './card-view-low-details.component';

describe('CardViewLowDetailsComponent', () => {
  let component: CardViewLowDetailsComponent;
  let fixture: ComponentFixture<CardViewLowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewLowDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardViewLowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
