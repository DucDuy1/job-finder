package JobFinder.dto.authDto;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private String email;
    private String otp;
    private String newPassword;
}
