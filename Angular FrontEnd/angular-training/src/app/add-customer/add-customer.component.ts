import { Component, Inject } from '@angular/core';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { flightEntity } from '../view-flights/flightEntity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { Customer } from './customerEntity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from '../services/booking.service';
import { Bookings } from '../bookings/bookingEntity';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  customerForm !: FormGroup;

  storeCustomer! : Customer;

  constructor(@Inject(MAT_DIALOG_DATA) public flightdetails:any,
  private router: Router,
   private formBuilder: FormBuilder,
   private customerservice:CustomerService,
    private _snackBar: MatSnackBar,
    private bookingservice : BookingService){

    console.log("flight details",this.flightdetails)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  customerCredentials() {
    //Capture customers details
    const customer: Customer = {
      id:0,
      username:this.customerForm.get('username')?.value,
      firstName: this.customerForm.get('firstName')?.value,
      lastName: this.customerForm.get('lastName')?.value,
      passportNumber: this.customerForm.get('passportNumber')?.value,
      email: this.customerForm.get('email')?.value,
      phoneNumber: this.customerForm.get('phoneNumber')?.value
    };

  
    this.customerservice.createCustomer(customer).subscribe(details => {
      console.log('Subscribed customer  details :', details);
      
      location.reload;
      this.openSnackBar("successfully booked a flight with id! ", "Ok");

      this.storeCustomer = details;

      const booking : Bookings = {
        customerId : this.storeCustomer.id,
        flightId : this.flightdetails.id,
        referenceNumber :""
      }

      //Make a booking
      this.bookingservice.createBooking(booking).subscribe(bookedFlight =>{
        console.log("Customers booked flight is",bookedFlight)
      })

      this.openBookings(this.flightdetails,this.storeCustomer)

    });
  }

  openBookings(flightdetails : any, customer : any){
    const navExtras : NavigationExtras ={
      queryParams:{flightdetails: JSON.stringify(flightdetails), customerdetails: JSON.stringify(customer)}
    };
    this.router.navigate(['/Bookings'],navExtras)
  }

  ngOnInit():void{

     this.customerForm = this.formBuilder.group({
      username : ['',Validators.required],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      passportNumber : ['', Validators.required],
      email : ['', Validators.required],
      phoneNumber : ['', Validators.required],

    })
    
  }
}
