package JobFinder.controller;

import JobFinder.jwt.Payload.LoginRequest;
import JobFinder.jwt.Payload.LoginResponse;
import JobFinder.jwt.Payload.RegisterRequest;
import JobFinder.jwt.Payload.RegisterResponse;
import JobFinder.dto.authDto.ChangePasswordDto;
import JobFinder.dto.authDto.ForgotPasswordDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.dto.response.ResponseDto;
import JobFinder.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        RegisterResponse registerResponse = authenticationService.register(registerRequest, response);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request, HttpServletResponse response) {
        LoginResponse loginResponse = authenticationService.login(request, response);
        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        authenticationService.logout(request, response);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/change-password")
    public ResponseDto<String> changePassword(@RequestBody ChangePasswordDto request) {
        ResponseDto<String> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        authenticationService.changePassword(request);
        return responseDto;
    }

    @PostMapping("/forgot-password")
    public ResponseDto<String> forgotPassword(@RequestBody ForgotPasswordDto request) {
        ResponseDto<String> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        authenticationService.forgotPassword(request);
        return responseDto;
    }
}
