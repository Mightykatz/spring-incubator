package entelect.training.incubator.controller;

import entelect.training.incubator.model.Booking;
import entelect.training.incubator.model.SearchByProperty;
import entelect.training.incubator.service.BookingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("bookings")
@CrossOrigin(origins = {"http://localhost:4200"}, methods = {RequestMethod.GET, RequestMethod.POST})
public class BookingController {

    private final Logger LOGGER = LoggerFactory.getLogger(BookingController.class);

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking){
        LOGGER.info("Processing booking creation request for booking={}", booking);

        final Booking savedBooking = bookingService.createBooking(booking);

        LOGGER.trace("Booking is created bruv");

        return new ResponseEntity<>(savedBooking, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Integer id){
        LOGGER.info("Processing booking search request for booking id={}", id);
        Booking booking = this.bookingService.getBookingID(id);

        if( booking != null){
            LOGGER.trace("Found booking");
            return new ResponseEntity<>(booking,HttpStatus.OK);
        }
        LOGGER.trace("booking not found");
        return ResponseEntity.notFound().build();
    }


    @PostMapping("/search")
    public ResponseEntity<List<Booking>> searchBookings(@RequestBody SearchByProperty searchByProperty){
        List<Booking> foundBookings = bookingService.search(searchByProperty);

        if(foundBookings != null){

            return ResponseEntity.ok(foundBookings);
        }

       return ResponseEntity.notFound().build();
    }
}
