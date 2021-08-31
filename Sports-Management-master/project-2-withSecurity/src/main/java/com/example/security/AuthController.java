package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@PostMapping("/auth")
	public ResponseEntity<?> authenticate(@RequestBody AuthRequest authRequest) {
		
		System.out.println(authRequest);
		
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new RuntimeException("incorrect username or password");
		}

		UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUserName());

		String jwt = jwtUtils.generateToken(userDetails);

		AuthResponse authResponse = new AuthResponse(jwt);

		return ResponseEntity.ok(authResponse);

	}

	@ExceptionHandler(value = RuntimeException.class)
	@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
	public AuthResponse authExceptionHandler(Throwable e) {
		AuthResponse authResponse = new AuthResponse(null);
		authResponse.setMesssage(e.getMessage());
		return authResponse;
	}

}
