package JobFinder.service;

import JobFinder.jwt.Payload.LoginRequest;
import JobFinder.jwt.Payload.LoginResponse;
import JobFinder.jwt.Payload.RegisterRequest;
import JobFinder.jwt.Payload.RegisterResponse;
import JobFinder.dto.authDto.ChangePasswordDto;
import JobFinder.dto.authDto.ForgotPasswordDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthenticationService {
    RegisterResponse register(RegisterRequest request, HttpServletResponse response);

    LoginResponse login(LoginRequest request, HttpServletResponse response);

    void logout(HttpServletRequest request, HttpServletResponse response);

    void forgotPassword(ForgotPasswordDto request);

    void changePassword(ChangePasswordDto request);

}
