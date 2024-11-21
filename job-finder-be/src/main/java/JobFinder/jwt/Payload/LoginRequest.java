package JobFinder.jwt.Payload;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {
    @NotEmpty(message = "user name not empty")
    @Size(min = 8, max = 20, message = "user name must be between 8 and 20 characters")
    private String username;
    @NotEmpty(message = "password not empty")
    @Size(min = 8, max = 20, message = "password must be between 8 and 20 characters")
    private String password;
}
