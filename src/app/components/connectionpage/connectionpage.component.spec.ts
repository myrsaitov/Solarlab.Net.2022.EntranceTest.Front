import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionpageComponent } from './connectionpage.component';

describe('ConnectionpageComponent', () => {
  let component: ConnectionpageComponent;
  let fixture: ComponentFixture<ConnectionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
