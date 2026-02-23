package com.example.demo.filter;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Optional;

@WebFilter(urlPatterns = {"/api/*","/admin/*"})
public class AuthenticationFilter implements Filter {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthenticationFilter(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String uri = req.getRequestURI();

        // Allow login and register without token
        if (uri.contains("/api/auth/login") || uri.contains("/api/users/register")) {
            chain.doFilter(request, response);
            return;
        }

        // Read token from cookie
        String token = null;
        if (req.getCookies() != null) {
            for (Cookie c : req.getCookies()) {
                if ("authToken".equals(c.getName())) {
                    token = c.getValue();
                }
            }
        }

        if (token != null && authService.validateToken(token)) {
            String username = authService.extractUsername(token);
            Optional<User> user = userRepository.findByUsername(username);

            if (user.isPresent()) {
                req.setAttribute("authenticatedUser", user.get());
                chain.doFilter(request, response);
                return;
            }
        }

        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        res.getWriter().write("Unauthorized");
    }
}
