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

  createCustomer(customer: Customer){
    this.customerservice.createCustomer(customer).subscribe(details =>{
      console.log("Customer details fot the flight are as" ,details)
    })
  }

  ngOnInit():void{

     this.customerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      passportNumber : ['', Validators.required],
      email : ['', Validators.required],
      phoneNumber : ['', Validators.required],

    })
    
  }
}
