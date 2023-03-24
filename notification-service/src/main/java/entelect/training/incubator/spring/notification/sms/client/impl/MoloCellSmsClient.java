package entelect.training.incubator.spring.notification.sms.client.impl;

import com.google.gson.Gson;
import entelect.training.incubator.spring.notification.sms.client.SmsClient;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Service;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.TextMessage;
import java.util.Map;

/**
 * A custom implementation of a fictional SMS service.
 */
@Service
public class MoloCellSmsClient implements SmsClient {
    
    @Override
    public void sendSms(String phoneNumber, String message) {
        System.out.println(String.format("Sending SMS, destination='{}', '{}'", phoneNumber, message));
    }

    @JmsListener(destination = "inbound.topic")
    @SendTo("outbound.topic")
    public String receiveMessageFromTopic(final Message jsonMessage) throws JMSException {
        String messageData = null;
        System.out.println("Received message " + jsonMessage);
        String response = null;
        if(jsonMessage instanceof TextMessage) {
            TextMessage textMessage = (TextMessage)jsonMessage;
            messageData = textMessage.getText();
            //Map map = new Gson().fromJson(messageData, Map.class);
            response  = "Hello " /*+ map.get("name")*/;
        }
        return response;
    }
}
