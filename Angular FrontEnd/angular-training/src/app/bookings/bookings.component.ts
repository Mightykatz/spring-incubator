import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Customer } from '../add-customer/customerEntity';
import { BookingService } from '../services/booking.service';
import { flightEntity } from '../view-flights/flightEntity';

export interface CustomerID{
  customerID: number;
}

//Make summary show more details
export interface BookingSummary {
  firstName: string;
  passport: string;
  destination: string;
  cost: number;
  referenceNumber : string;
}

//Temp display
export interface BookingsEntries{
  customerId: number,
  flightId: number,
  referenceNumber: string
}

const ELEMENT_DATA: BookingSummary[] = [
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875, referenceNumber: "SVWBRT"},
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875, referenceNumber: "SVWBRT"},
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875, referenceNumber: "SVWBRT"},
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875, referenceNumber: "SVWBRT"},
   ]

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  myELEMENTDATA: BookingSummary[] = []

  mycustomerID !: CustomerID

  constructor(private route: ActivatedRoute, private bookingService : BookingService){}

  displayedColumns: string[] = ['firstName', 'passport', 'destination','cost','referenceNumber'];
  //displayedColumns: string[] = ['customerId', 'flightId', 'referenceNumber'];
  dataSource = this.myELEMENTDATA;
  
  

  flightdetails !: flightEntity;
  customerDetails !: Customer;

  ngOnInit() {
    this.route.queryParams.subscribe(parameter =>{
      console.log("passed parameter are given as follows",parameter)
      console.log("Flight details: ", JSON.parse(parameter['flightdetails']));
      console.log("Custormer details: ", JSON.parse(parameter['customerdetails']));

      this.flightdetails = JSON.parse(parameter['flightdetails'])

      this.customerDetails =  JSON.parse(parameter['customerdetails'])
      
      const mycustID : CustomerID = {
        customerID:this.customerDetails.id
      }

      this.bookingService.getFlightReferenceNumber(mycustID).subscribe({
        next: (bookedDetails: any[]) => {
          console.log("final bookings ", bookedDetails);
      
          const newElementData: BookingSummary[] = [];
      
          bookedDetails.forEach((_element: any) => {
            const newElement: BookingSummary = {
              firstName: this.customerDetails.firstName,
              passport: this.customerDetails.passportNumber,
              destination: this.flightdetails.destination,
              cost: this.flightdetails.seatCost,
              referenceNumber: _element.referenceNumber,
            };
            newElementData.push(newElement);
          });
      
          this.dataSource = newElementData;
        },
        error: (err: any) => {
          console.error(err);
          // handle the error as needed
        }
      });      

    })
  }
}
