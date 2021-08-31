import { NodeWithI18n } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { BookingServiceService } from '../booking-service.service';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css']
})

export class BookSlotComponent implements OnInit {

  @Input() choosenSport : any;
  @Input() show : any = true; 

  sportName : string = '';
  constructor(private bookService : BookingServiceService){}

  isNameClicked : boolean = this.show;
  ngOnInit(): void {
    
  }
  
  monthList : Array<String> = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  now : Date = new Date();
  nowDate : number = this.now.getDate();
  nowMonth : number = this.now.getMonth();
  nowYear : number = this.now.getFullYear();


  numOfDays : number = new Date(this.nowYear,this.nowMonth+1,0).getDate();
  numOfNextDays : number = new Date(this.nowYear,this.nowMonth+2,0).getDate();
  
  createArray(inc : number,days : number){
    let tempDateList : Array<Date> = new Array();
    for(let i = 1;i<=days;i++){
      let tempDate : Date = new Date(this.nowYear,this.nowMonth+inc,i);
      tempDateList.push(tempDate);
      console.log(tempDate.getDate());
    }
    console.log(tempDateList.length);
    return tempDateList;
  }
  dateList : Array<Date> = this.createArray(0,this.numOfDays);
  nextDateList : Array<Date> = this.createArray(1,this.numOfNextDays);

  
  
  checkNextMonth() : boolean{
    let temp : boolean = false;
    if((this.numOfDays - this.nowDate) < (this.numOfDays-1)){
      console.log("yes");
      temp = true;
    }
    return temp;
  }

  nextMonth : boolean = this.checkNextMonth();
  
  

  

  dateClicked : Date = new Date();
  onDateClick(clickedDate : Date){
    this.bookService.changeDateToTime(clickedDate);
  }


}


// function value(value: any) {
//   throw new Error('Function not implemented.');
// }

