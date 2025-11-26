package com.taskmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for simplicity in demo (otherwise POST/PUT/PATCH/DELETE can be blocked)
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Allow authentication endpoints
                .requestMatchers("/auth/**").permitAll()
                // Allow all task endpoints without login
                .requestMatchers("/tasks/**").permitAll()
                // Everything else still requires authentication
                .anyRequest().authenticated()
            )
            // Optional: keep default login form and HTTP Basic enabled
            .formLogin(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
