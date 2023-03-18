import { Component, Inject } from '@angular/core';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { flightEntity } from '../view-flights/flightEntity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer } from './customerEntity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  customerForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,private customerservice:CustomerService){}

  customerCredentials() {
    const customer: Customer = {
      username:this.customerForm.get('username')?.value,
      firstName: this.customerForm.get('firstName')?.value,
      lastName: this.customerForm.get('lastName')?.value,
      passportNumber: this.customerForm.get('passportNumber')?.value,
      email: this.customerForm.get('email')?.value,
      phoneNumber: this.customerForm.get('phoneNumber')?.value
    };
  
    console.log('Customer details for the flight are:', customer);
  
    this.customerservice.createCustomer(customer).subscribe(details => {
      console.log('Subscribed details :', details);

    });
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
