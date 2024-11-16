package JobFinder.dto.authDto;

import JobFinder.entity.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OtpDto {
    private Long id;
    private User user;
    private String otpCode;
    private LocalDateTime createdTime;
    private LocalDateTime expirationTime;
}
