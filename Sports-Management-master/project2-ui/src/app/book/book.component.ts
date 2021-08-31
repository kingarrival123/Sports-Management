import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from '../booking-service.service';
import { Slots } from '../slot-entity';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService : BookingServiceService) { }

  sportName : String = "";
  showDateForm : boolean = true;
  disabledTime : Array<string> = [];

  slots : Array<Slots> = [];

  ngOnInit(): void {
    this.sportName = this.bookService.sportName;

    this.bookService.sportStream.subscribe({
      next: (sport) => {
        this.sportName = sport;
      },
    })
    this.bookService.showDateStream.subscribe({
      next: (bool) => {
        this.showDateForm = bool;
      }
    })
    this.bookService.slotsStream.subscribe({
      next: (s) =>{
        this.slots = s;
      }
    })
    this.bookService.disabledTimeStream.subscribe({
      next: (time) =>{
        this.disabledTime = time
      }
    })
  }
  
}
