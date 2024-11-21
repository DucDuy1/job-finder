package JobFinder.jwt.Payload;

import JobFinder.dto.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterResponse {
    private String userName;
    private String email;
    private String message;
    private UserDto userDto;
    private String avatarUrl;
}
