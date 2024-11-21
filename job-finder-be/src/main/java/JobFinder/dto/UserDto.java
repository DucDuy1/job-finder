package JobFinder.dto;

import JobFinder.enumerated.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.Where;

@Data
@Where(clause = "is_deleted = false")
public class UserDto {
    private Long id;
    @NotEmpty(message = "user name not empty")
    @Size(min = 8, max = 20, message = "user name must be between 8 and 20 characters")
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotEmpty(message = "password not empty")
    @Size(min = 8, max = 20, message = "password must be between 8 and 20 characters")
    private String password;
    private boolean deleted;
    private String fullName;
    @Email(message = "Email invalid")
    @Size(min = 3, message = "Email must be at least 3 characters")
    private String email;
    private Integer age;
    private String avatarUrl;
    private Boolean isActive;
    @Enumerated(EnumType.STRING)
    private Role role;
}
