import { Component } from '@angular/core';

export interface BookingSummary {
  firstName: string;
  passport: string;
  destination: string;
  cost: number;
}

const ELEMENT_DATA: BookingSummary[] = [
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875},
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875},
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875},
  { firstName: 'James', passport: "0125789652", destination: 'Johannesburg',cost:875},
   ]

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  displayedColumns: string[] = ['firstName', 'passport', 'destination','cost'];
  dataSource = ELEMENT_DATA;
}
