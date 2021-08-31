import { Component, OnInit } from '@angular/core';
import { BookSlotComponent } from '../book-slot/book-slot.component';
import { BookingServiceService } from '../booking-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private bookingService : BookingServiceService){}

  ngOnInit(): void {
  }

  showDropDown : boolean = false;
  
  dropClick(){
    this.showDropDown = !this.showDropDown;
  }
  sportName : string = "";

  openDateForm(name : string){
    console.log(name);
    this.bookingService.changeSportName(name, true);
  }

}
