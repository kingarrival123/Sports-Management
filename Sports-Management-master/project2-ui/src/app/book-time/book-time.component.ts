import { Component, Input, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BookingServiceService } from '../booking-service.service';

@Component({
  selector: 'app-book-time',
  templateUrl: './book-time.component.html',
  styleUrls: ['./book-time.component.css']
})
export class BookTimeComponent implements OnInit {

  @Input() choosenSport : any;
  @Input() disabledTime : any;


  constructor(private bookService : BookingServiceService) { }

  showTimeForm : boolean = false;

  ngOnInit(): void {
    this.bookService.showTimeStream.subscribe({
      next: (bool) => {
        this.showTimeForm = bool;
      }
    })
  }

  nowDateTime : Date = new Date();

  createTimeArray(){
    let tempArray : Array<Date> = new Array();

    let stringArray : Array<string> = new Array();

    for(let i = 0;i<24;i++){
      let tempDate : Date = new Date(this.nowDateTime.getFullYear(),this.nowDateTime.getMonth(),this.nowDateTime.getDate(),i);
      tempArray.push(tempDate);
    }
    let temp : Date = tempArray[0];
    console.log(temp);
    for(let i = 0;i<tempArray.length;i++){
      let tempToday = new Date();
      let tempArrArray = new Array();
      if(i+1 == 24){
        let first : Date = tempArray[i]
        let second : Date = tempToday;
        second.setHours(24,0,0,0);
        let amPm1 = first.toLocaleString('en-US', { hour: '2-digit', hour12: true })
        let amPm2 = second.toLocaleString('en-US', { hour: '2-digit', hour12: true })
        let amPmJoin = amPm1 + " - " + amPm2; 
        stringArray.push(amPmJoin);
      }else{
        let first : Date = tempArray[i];
        let second : Date = tempArray[i+1];
        let amPm1 = first.toLocaleString('en-US', { hour: '2-digit', hour12: true })
        let amPm2 = second.toLocaleString('en-US', { hour: '2-digit', hour12: true })
        let amPmJoin = amPm1 + " - " + amPm2; 
        stringArray.push(amPmJoin);
      }

    }
    return stringArray;
  }

  timeArray : Array<string> = this.createTimeArray();

  isTimeClicked : boolean = false;

  firstTimeClicked : Date = new Date();
  secondTimeClicked : Date = new Date();


  clickTime(timePeriod : string){
    this.bookService.changeTimeToBuy(timePeriod);
    console.log(this.disabledTime);
    console.log(timePeriod);
  }

  showTime(){
    console.log(this.disabledTime);
  }
  
  
}
