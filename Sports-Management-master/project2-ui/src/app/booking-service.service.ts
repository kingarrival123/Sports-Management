import { DatePipe, Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Injectable, Output } from '@angular/core';


import { BehaviorSubject, Subject } from 'rxjs';
import { Slots } from './slot-entity';
// import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  listOfSlot : Array<Slots> = [];

  listOfTime : Array<string> = [];

  sportName = '';
  dateString : string = '';
  timeString : string = '';
  dateValue : Date = new Date();
  constructor(private httpClient : HttpClient) { }
  
  showDateForm = true;
  showTimeForm = false;
  showBuyForm = false;
  sportStream : Subject<string> = new Subject();
  dateStream : Subject<string> = new Subject();
  timeStream : Subject<string> = new Subject();

  showDateStream : Subject<boolean> = new Subject();
  showTimeStream : Subject<boolean> = new Subject();
  showBuyStream : Subject<boolean> = new Subject();

  slotsStream: BehaviorSubject<any> = new BehaviorSubject(this.listOfSlot);
  disabledTimeStream : Subject<Array<string>> = new Subject();
 
  changeSportName(name : string, show : boolean){
    this.sportName = name;
    console.log(name);
    this.showDateForm = show;
    this.showTimeForm = false;
    this.showBuyForm = false;
    this.sportStream.next(this.sportName);
    this.showDateStream.next(this.showDateForm);
    this.showTimeStream.next(this.showTimeForm);
    this.showBuyStream.next(this.showBuyForm);
  }

  changeDateToTime(selectedDate : Date){
    this.showTimeForm = true;
    this.showDateForm = false;
    this.showBuyForm = false;
    this.dateValue = selectedDate;
    let str = "";
    let day = ("0" + selectedDate.getDate()).slice(-2);
    let month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
    let year = selectedDate.getFullYear();
    str = year+"-"+month+"-"+day;
    this.dateString = str;
    console.log(str);

    this.dateStream.next(this.dateString);

    this.showTimeStream.next(this.showTimeForm);
    this.showDateStream.next(this.showDateForm);
    this.showBuyStream.next(this.showBuyForm);

    let api = "http://localhost:8080/booked-slots/" + this.sportName + "/" + this.dateString;

    console.log(this.sportName + " " + this.dateValue);
    this.httpClient.get(api).subscribe((slots : any) =>{
      this.listOfSlot = slots;
      console.log(slots);
      console.log("from httpclient");
      this.slotsStream.next(this.listOfSlot);

      let tempDisabledTime : Array<string> = [];
      for(let i = 0;i<this.listOfSlot.length;i++){
        let disTime : any = this.listOfSlot[i].time;
        console.log("from time-for-loop" + disTime);
        tempDisabledTime.push(disTime);
      }
      this.listOfTime = tempDisabledTime;
      this.disabledTimeStream.next(this.listOfTime);
    })

    console.log("from service list of slot" + this.listOfSlot + "end");

  }

  changeTimeToBuy(bookedTime : string){
    this.timeString = bookedTime;
    this.timeStream.next(this.timeString);
    this.showTimeForm = false;
    this.showDateForm = false;
    this.showBuyForm = true;
    this.showTimeStream.next(this.showTimeForm);
    this.showDateStream.next(this.showDateForm);
    this.showBuyStream.next(this.showBuyForm);
  }
  insertMySlot(){
    let name : string = "jagan";
    let sport : string = this.sportName;
    let date : string = this.dateString;
    let time : string = this.timeString;
    let api = "http://localhost:8080/book-slot/";
    this.httpClient.post(api,{name,sport,date,time}).subscribe(
      (response : any) => {
        console.log("success");
      }
    )
  }

  getApi : string = "http://localhost:8080/booked-slots/jagan";
  mySlots : Array<Slots> = [];
  getbooked(){
    return this.httpClient.get(this.getApi);
  }
}
