package entelect.training.incubator.service;

import com.google.gson.Gson;
import entelect.training.incubator.controller.BookingController;
import entelect.training.incubator.model.*;
import entelect.training.incubator.repository.BookingRepository;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
//import org.springframework.web.client.RestTemplate;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.jms.TextMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

        NotificationObject notification = Notification(customer, flight);
        String phoneNumber = notification.getPhoneNumber();
        String message = notification.getMessage();


        Gson gson = new Gson();
        String noticationJSON = gson.toJson(notification);

        sendMessage("inbound",noticationJSON);
        return bookingRepository.save(booking);

    }

    public NotificationObject Notification(Customer customer, Flight flight) {
        String phoneNumber = customer.getPhoneNumber();
        String message = "Molo Air: Confirming flight " + flight.getFlightNumber() + " booked for " + customer.getFirstName() + " " + customer.getLastName() + " on " + flight.getDepartureTime();
        return new NotificationObject(phoneNumber, message);
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

    @Autowired
    JmsTemplate jmsTemplate;
    public void sendMessage(final String queueName, final String Inputmessage) {
        //Map map = new Gson().fromJson(Inputmessage, Map.class);
        //final String textMessage = "Hello" + map.get("name");
        System.out.println("Sending message " + Inputmessage + "to queue - " + queueName);
        jmsTemplate.send(queueName, new MessageCreator() {

            public Message createMessage(Session session) throws JMSException {
                TextMessage message = session.createTextMessage(Inputmessage);
                return message;
            }
        });
    }

}
