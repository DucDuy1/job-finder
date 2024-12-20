package JobFinder.jwt.Payload;

import JobFinder.dto.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private Long id;
    private String token;
    private String expirationTime;
    private UserDto userDto;
    private String username;
    private String role;
}
