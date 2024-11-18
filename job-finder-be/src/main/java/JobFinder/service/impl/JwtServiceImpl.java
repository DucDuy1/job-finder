package JobFinder.service.impl;

import JobFinder.entity.User;
import JobFinder.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {
    private static final String SECRET_KEY = "VFaN8UxJPat3fk8V+sqmHL63ztNSM5+2a+bp7hL9i/AswrkYCJ6cMNsWo=";

    @Override
    public String extractUsername(String token) {
        Claims claims = extractClaims(token);
        if (claims != null) {
            Date expirationTime = claims.getExpiration();
            boolean isExpired = expirationTime.before(Date.from(Instant.now()));
            if (!isExpired) {
                return claims.getSubject();
            } else return null;
        }
        return null;
    }

    @Override
    public String generateToken(User user) {
        return Jwts
                .builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // This funciton check token is valid or not (token must coincide with UserDetails and not expired)
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        final Claims claims = extractClaims(token);
        boolean isTokenExpired = claims.getExpiration().before(new Date());
        return (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired);
    }

    @Override
    public String refreshToken(String token) {
        Claims claims = extractClaims(token);
        if (claims == null) return null;
        Date expiration = claims.getExpiration();
        Date now = new Date();
        long timeRemaining = expiration.getTime() - now.getTime();
        if (timeRemaining > 23 * 60 * 60 * 1000L) {  //auto refresh token when near expiration
            return null;
        }
        return Jwts.builder()
                .setSubject(claims.getSubject())
                .setIssuedAt(now)
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000L))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
