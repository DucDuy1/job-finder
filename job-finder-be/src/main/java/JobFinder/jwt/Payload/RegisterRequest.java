package JobFinder.jwt.Payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    @NotEmpty(message = "user name not empty")
    @Min(message = "user name must be at least 8 characters",value = 8)
    @Max(message = "user name max is 12 characters",value = 12)
    private String username;
    @NotEmpty(message = "password not empty")
    @Min(message = "password must be at least 8 characters",value = 8)
    @Max(message = "password max is 12 characters",value = 12)
    private String password;
    @Email(message = "Email invalid")
    @NotEmpty(message = "email not empty")
    @Min(message = "email must be at least 5 characters",value = 5)
    private String email;
}
