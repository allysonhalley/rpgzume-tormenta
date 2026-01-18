package com.hefti.rpgzume.security;

import com.hefti.rpgzume.user.User;
import com.hefti.rpgzume.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("DEBUG: Attempting to load user by email: " + email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.out.println("DEBUG: User not found with email: " + email);
                    return new UsernameNotFoundException("User not found with email: " + email);
                });

        System.out.println("DEBUG: User found: " + user.getEmail() + ", Password Hash: " + user.getPassword());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword() != null ? user.getPassword() : "",
                new ArrayList<>());
    }
}
