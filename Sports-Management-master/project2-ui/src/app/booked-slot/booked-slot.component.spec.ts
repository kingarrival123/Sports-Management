import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedSlotComponent } from './booked-slot.component';

describe('BookedSlotComponent', () => {
  let component: BookedSlotComponent;
  let fixture: ComponentFixture<BookedSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
