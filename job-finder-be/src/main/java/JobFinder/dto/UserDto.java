package JobFinder.dto;

import JobFinder.enumerated.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserDto {
    private Long id;

    @NotEmpty(message = "user name not empty")
    @Size(min = 8, max = 20, message = "user name must be between 8 and 20 characters")
    @Column(unique = true)
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotEmpty(message = "password not empty")
    @Size(min = 8, max = 20, message = "password must be between 8 and 20 characters")
    private String password;

    private String fullName;

//    @Email(message = "Email invalid")
//    @Min(message = "Email must be at least 3 characters",value = 3)
    private String email;

    private Integer age;
    private String avatarUrl;
    private Boolean isActive;

    @Enumerated(EnumType.STRING)
    private Role role;
}
