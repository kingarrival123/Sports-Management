import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookingServiceService } from '../booking-service.service';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.css']
})
export class BuyFormComponent implements OnInit {

  @Input() choosenSport :any;
  constructor(private bookService : BookingServiceService, private router : Router) { }

  sportName : string = '';
  date : string = '';
  time : string = '';

  showBuyForm : boolean = false;
  ngOnInit(): void {

    this.bookService.sportStream.subscribe({
      next: (name) => {
        this.sportName = name;
      }
    })
    this.bookService.dateStream.subscribe({
      next: (date) =>{
        this.date = date;
      }
    })
    this.bookService.timeStream.subscribe({
      next: (time) =>{
        this.time = time;
      }
    })
    this.bookService.showBuyStream.subscribe({
      next: (bool) =>{
        this.showBuyForm = bool;
      }
    })
  }

  postMySlot(){
    this.bookService.insertMySlot();
    this.router.navigate(['my-slots'])
  }

}
