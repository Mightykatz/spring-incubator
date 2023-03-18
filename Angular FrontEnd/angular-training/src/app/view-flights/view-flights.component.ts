import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { FlightService } from '../services/flight.service';
import { flightEntity } from './flightEntity';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css']
})
export class ViewFlightsComponent {
  
  item1: flightEntity = {
    "flightNumber": "MN123",
    "origin": "JOHANNESBURG",
    "destination": "CAPE_TOWN",
    "departureTime": "2020-05-06T12:35:00",
    "seatsAvailable": 192,
    "seatCost" : 895.00
  };
  item2: flightEntity = {
    "flightNumber": "ZX123",
    "origin": "Pretoria",
    "destination": "Bloemfontain",
    "departureTime": "2020-05-06T12:35:00",
    "seatsAvailable": 892,
    "seatCost" : 865.00
  };
  item3: flightEntity = {
    "flightNumber": "MN123",
    "origin": "Wester Cape",
    "destination": "Pretoria",
    "departureTime": "2020-05-06T12:35:00",
    "seatsAvailable": 192,
    "seatCost" : 7855.00
  };

  //flightsAvailable =[this.item1,this.item2,this.item3]

  flightsAvailable: flightEntity[] = []

  constructor(public dialog:MatDialog, private flightservice: FlightService){
    this.flightservice.getFlights().subscribe(flights =>{
      this.flightsAvailable = flights
      console.log('these are the glights',flights)
    })
  }

  openCustomerDialog(){
    this.dialog.open(AddCustomerComponent,{
        width:'600px',
        height:'450px',
    })
    //console.log("this data should be empty for now",data)
  }
}
