import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { ViewFlightsComponent } from './view-flights/view-flights.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { BookingsComponent } from './bookings/bookings.component';
import {HttpClientModule} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StyledNavigationComponent } from './styled-navigation/styled-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ViewFlightsComponent,
    AddCustomerComponent,
    BookingsComponent,
    StyledNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      //{path: '',component: SideBarComponent,pathMatch: 'full'},
      {path: 'Flights',component:ViewFlightsComponent},
      {path: 'Customer',component:AddCustomerComponent},
      {path: 'Bookings',component:BookingsComponent}
            
    ])
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
