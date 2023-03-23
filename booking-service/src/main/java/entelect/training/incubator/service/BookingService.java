package entelect.training.incubator.service;

import entelect.training.incubator.controller.BookingController;
import entelect.training.incubator.model.Booking;
import entelect.training.incubator.model.Customer;
import entelect.training.incubator.model.Flight;
import entelect.training.incubator.model.SearchByProperty;
import entelect.training.incubator.repository.BookingRepository;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
//import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final Logger LOGGER = LoggerFactory.getLogger(BookingService.class);
    private final BookingRepository bookingRepository;


    public BookingService(BookingRepository bookingRepository){
        this.bookingRepository = bookingRepository;

    }

    public Booking createBooking(Booking booking){
        booking.setReferenceNumber(RandomString.make(6).toUpperCase());
        RestTemplate restTemplate = new RestTemplate();
        String customerEndPoint = "http://localhost:8201/customers/" +  booking.getCustomerId();
        String flightEndPoint = "http://localhost:8202/flights/" + booking.getFlightId();
        Customer customer = restTemplate.getForObject(customerEndPoint, Customer.class);
        Flight flight = restTemplate.getForObject(flightEndPoint, Flight.class);

        if(customer == null || flight==null){
            LOGGER.trace("The flight or the customer is not valid");
            return null;
        }
        return bookingRepository.save(booking);
    }

    public Booking getBookingID(Integer id){
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        return bookingOptional.orElse(null);
    }

    public List<Booking> search(SearchByProperty searchByProperty){
        List<Booking> bookingList = new ArrayList<>();

        Optional<List<Booking>> bookingsFound;
        if(searchByProperty.customerID != null && searchByProperty.customerID.isPresent()) {
            bookingsFound = bookingRepository.getBookingsByCustomerId(searchByProperty.customerID.get());
        }
        else{
            bookingsFound = bookingRepository.getBookingsByReferenceNumber(searchByProperty.referenceNumber.get());
        }
        bookingList = bookingsFound.get();
        return bookingList;
    }

}
