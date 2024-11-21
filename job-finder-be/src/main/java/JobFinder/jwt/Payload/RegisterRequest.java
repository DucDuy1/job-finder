package JobFinder.jwt.Payload;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    @NotEmpty(message = "user name not empty")
    @Size(min = 8, max = 20, message = "username must be between 8 and 20 characters")
    private String username;
    @NotEmpty(message = "password not empty")
    @Size(min = 8, max = 20, message = "password must be between 8 and 20 characters")
    private String password;
    @Email(message = "Email invalid")
    @NotEmpty(message = "email not empty")
    @Size(min = 8, max = 20, message = "email must be between 5 and 20 characters")
    private String email;
    private String avatarUrl;
}
