package JobFinder.service;

import JobFinder.entity.User;

public interface JwtService {
    String extractUsername(String token);

    String generateToken(User user);

    String refreshToken(String token);
}
