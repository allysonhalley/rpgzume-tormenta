package com.hefti.rpgzume.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret:9a4f2c8d3b7e1g5h9a4f2c8d3b7e1g5h9a4f2c8d3b7e1g5h9a4f2c8d3b7e1g5h9a4f2c8d3b7e1g5h}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs:86400000}")
    private int jwtExpirationMs;

    @org.springframework.beans.factory.annotation.Autowired
    private com.hefti.rpgzume.user.UserRepository userRepository;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();

        // Fetch user to get ID
        com.hefti.rpgzume.user.User user = userRepository.findByEmail(username).orElse(null);
        Long userId = (user != null) ? user.getId() : null;

        return Jwts.builder()
                .setSubject(username)
                .claim("id", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateTokenFromEmail(String email) {
        // Fetch user to get ID
        com.hefti.rpgzume.user.User user = userRepository.findByEmail(email).orElse(null);
        Long userId = (user != null) ? user.getId() : null;

        return Jwts.builder()
                .setSubject(email)
                .claim("id", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUserEmailFromJWT(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
        }
        return false;
    }
}
