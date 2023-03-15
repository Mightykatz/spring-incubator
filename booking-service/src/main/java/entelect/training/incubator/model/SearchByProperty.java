package entelect.training.incubator.model;

import lombok.Data;

import java.util.Optional;

@Data
public class SearchByProperty {

    public Optional<Integer> customerID;

    public Optional<String> referenceNumber;
}
