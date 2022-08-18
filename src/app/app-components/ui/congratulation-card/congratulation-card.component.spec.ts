import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratulationCardComponent } from './congratulation-card.component';

describe('CongratulationCardComponent', () => {
  let component: CongratulationCardComponent;
  let fixture: ComponentFixture<CongratulationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratulationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongratulationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
