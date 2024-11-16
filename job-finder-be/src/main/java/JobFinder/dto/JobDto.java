package JobFinder.dto;

import JobFinder.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class JobDto {
    private Long id;
//    @NotEmpty(message = "Company name cannot be blank")
//    @Size(min = 5, max = 20, message = "name company must be at least 5 characters")
    private String nameCompany;
    private String level;
    private String employmentType;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date applicationDeadline;
    private String title;
    private String description;
    private String location;
    private String imageUrl;
    private User user;
    private String tag;
}
