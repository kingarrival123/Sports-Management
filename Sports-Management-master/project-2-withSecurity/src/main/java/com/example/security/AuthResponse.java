package com.example.security;

public class AuthResponse {
	private String message;
	private String jwt;
	
	public AuthResponse(String jwt) {
		this.jwt = jwt;
	}

	public String getJwt() {
		return jwt;
	}

	public String getMesssage() {
		return message;
	}

	public void setMesssage(String message) {
		this.message = message;
	}
}
