import { Time } from "@angular/common"
import { Timestamp } from "rxjs"


export class Slots{
    id : number
    name : string
    sport : string
    date : String 
    time : String

    constructor(id:number, name:string, sport:string, date:String, time:String){
        this.id = id;
        this.name = name;
        this.sport = sport;
        this.date = date;
        this.time = time;
    }
}