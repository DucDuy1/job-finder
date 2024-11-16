package JobFinder.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchDto {
    public static final int MAX_20 = 10;
    @Min(value = 1)
    private int size = MAX_20;
    @Min(value = 0)
    private int page;
    private String keyWord = "%%";
}
