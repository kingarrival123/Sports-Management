import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from '../booking-service.service';
import { Slots } from '../slot-entity';

@Component({
  selector: 'app-booked-slot',
  templateUrl: './booked-slot.component.html',
  styleUrls: ['./booked-slot.component.css']
})
export class BookedSlotComponent implements OnInit {

  constructor(private bookService : BookingServiceService) { }
  mySlots : Array<Slots> = [];
  ngOnInit(): void {
    this.bookService.getbooked().subscribe({
      next: (slot : any) => {
        this.mySlots = slot;
      }
    })
  }

}
