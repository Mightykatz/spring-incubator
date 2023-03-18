import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../add-customer/customerEntity';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer){
    return this.http.post<any>('http://localhost:8201/customers',customer);
  }
  
}
