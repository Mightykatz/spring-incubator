package entelect.training.incubator.model;

public class NotificationObject {
    private String phoneNumber;
    private String message;

    public NotificationObject(String phoneNumber, String message) {
        this.phoneNumber = phoneNumber;
        this.message = message;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getMessage() {
        return message;
    }
}