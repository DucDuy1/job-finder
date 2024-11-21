package JobFinder.service.impl;

import JobFinder.jwt.Payload.LoginRequest;
import JobFinder.jwt.Payload.LoginResponse;
import JobFinder.jwt.Payload.RegisterRequest;
import JobFinder.jwt.Payload.RegisterResponse;
import JobFinder.config.BeanConfig;
import JobFinder.dto.UserDto;
import JobFinder.dto.authDto.ChangePasswordDto;
import JobFinder.dto.authDto.ForgotPasswordDto;
import JobFinder.dto.authDto.OtpDto;
import JobFinder.entity.Otp;
import JobFinder.entity.User;
import JobFinder.enumerated.Role;
import JobFinder.repository.OtpRepository;
import JobFinder.repository.UserRepository;
import JobFinder.service.AuthenticationService;
import JobFinder.service.FileService;
import JobFinder.service.JwtService;
import JobFinder.service.MailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final BeanConfig modelMapper;
    private final MailService mailServiceImpl;
    final FileService fileService;
    @Override
    public RegisterResponse register(RegisterRequest request, HttpServletResponse response) {
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setEmail(request.getEmail());
        newUser.setRole(Role.USER);
        newUser.setAvatarUrl("/defaul.jpg");
        User createdUser = userRepository.save(newUser);
        // Generate the JWT token
        String jwtToken = jwtService.generateToken(createdUser);
        return RegisterResponse.builder()
                .userDto(modelMapper.modelMapper().map(createdUser, UserDto.class))
                .message("User registered successfully")
                .userName(newUser.getUsername())
                .build();
    }

    public LoginResponse login(LoginRequest request, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new AuthenticationCredentialsNotFoundException("Authentication failed");
        }
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        // Generate JWT token
        var jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.refreshToken(jwtToken);
        if (refreshToken != null) {
            jwtToken = refreshToken;
        }
        // Return token in response body
        return LoginResponse.builder()
                .userDto(modelMapper.modelMapper().map(user, UserDto.class))
                .token(jwtToken) // Return JWT token in response
                .expirationTime(new SimpleDateFormat("dd/MM/yyyy")
                        .format(new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000L)))) // Token expiration time
                .role(user.getRole().toString())
                .username(user.getUsername())
                .id(user.getId())
                .build();
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    public void changePassword(ChangePasswordDto request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new IllegalArgumentException("Email does not exist");
        }
        Otp otpEntity = otpRepository.findByUser(user);
        if (otpEntity == null) {
            throw new IllegalArgumentException("OTP code does not exist");
        }
        if (!isValidOtp(user, request.getOtp())) {
            throw new IllegalArgumentException("OTP code is incorrect or expired");
        }
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    public void forgotPassword(ForgotPasswordDto request) {
        String email = request.getEmail();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("Email does not exist in the system");
        }
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        saveOtp(user, otp);
        mailServiceImpl.sendPasswordResetCode(user, otp);
    }

    private void saveOtp(User user, String otp) {
        OtpDto otpDto = new OtpDto();
        otpDto.setUser(user);
        otpDto.setOtpCode(otp);
        otpDto.setCreatedTime(LocalDateTime.now());
        otpDto.setExpirationTime(LocalDateTime.now().plusMinutes(30));
        Otp otpEntity = modelMapper.modelMapper().map(otpDto, Otp.class);
        otpRepository.save(otpEntity);
    }

    private boolean isValidOtp(User user, String otp) {
        Otp otpEntity = otpRepository.findByUser(user);
        if (otpEntity == null) {
            return false;
        }
        LocalDateTime currentTime = LocalDateTime.now();
        if (otpEntity.getOtpCode().equals(otp)) {
            if (currentTime.isBefore(otpEntity.getExpirationTime())) {
                otpRepository.delete(otpEntity);
                return true;
            } else {
                otpRepository.delete(otpEntity);
            }
        }
        return false;
    }
}


//    @Override
//    public RegisterResponse register(RegisterRequest request, HttpServletResponse response) {
//        User newUser = new User();
//        newUser.setUsername(request.getUserName());
//        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
//        newUser.setEmail(request.getEmail());
//        newUser.setRole(Role.MEMBER);
//
//        User createdUser = userRepository.save(newUser);
//
//        // Generate the JWT token
//        String jwtToken = jwtService.generateToken(createdUser);
//
//        // Create and configure the JWT cookie
//        Cookie jwtCookie = new Cookie("JWT_TOKEN", jwtToken);
//        jwtCookie.setHttpOnly(true);
//        jwtCookie.setSecure(true); // Set true for production (HTTPS)
//        jwtCookie.setPath("/"); // Root path
//        jwtCookie.setMaxAge(24 * 60 * 60); // Cookie expiration time (1 day)
//
//        // Add the cookie to the response
//        response.addCookie(jwtCookie);
//
//        return RegisterResponse.builder()
//                .userDto(modelMapper.modelMapper().map(createdUser, UserDto.class))
//                .message("User registered successfully")
//                .userName(newUser.getUsername())
//                .build();
//    }
//
//    public LoginResponse login(LoginRequest request, HttpServletResponse response) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getUserName(),
//                        request.getPassword()
//                )
//        );
//        User user = userRepository.findByUsername(request.getUserName())
//                .orElseThrow();
//        // Generate JWT token
//        var jwtToken = jwtService.generateToken(user);
//        // Create JWT token cookie
//        Cookie jwtCookie = new Cookie("JWT_TOKEN", jwtToken);
//        jwtCookie.setHttpOnly(true); // Prevent access by JavaScript (XSS protection)
//        jwtCookie.setSecure(true); // Set true in production (for HTTPS)
//        jwtCookie.setPath("/"); // Root path
//        jwtCookie.setMaxAge(24 * 60 * 60); // Cookie expires after 1 day
//        // Add the cookie to the response
//        response.addCookie(jwtCookie);
//        // Return LoginResponse without the JWT token
//        return LoginResponse.builder()
//                .userDto(modelMapper.modelMapper().map(user, UserDto.class)) // Return user info
//                .expirationTime(new SimpleDateFormat("dd/MM/yyyy")
//                        .format(new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000L)))) // Token expiration time
//                .role(user.getRole().toString()) // User's role
//                .build();
//    }
//
//    @Override
//    public void logout(HttpServletRequest request, HttpServletResponse response) {
//        clearAuthCookie(request, response);
//    }
//
//    private void clearAuthCookie(HttpServletRequest request, HttpServletResponse response) {
//        Cookie cookie = new Cookie("auth_token", null);
//        cookie.setPath("/");
//        cookie.setHttpOnly(true);
//        cookie.setMaxAge(0);
//        response.addCookie(cookie);
//    }
