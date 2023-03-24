import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookings } from '../bookings/bookingEntity';
import { CustomerID } from '../bookings/bookings.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(booking: Bookings){
    return this.http.post<any>(`http://localhost:8080/bookings`,booking)
  }

  getFlightReferenceNumber(customerID : CustomerID){
    return this.http.post<any>(`http://localhost:8080/bookings/search`,customerID)
  }
}
