package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.UserAccount;

public interface UserRepo extends JpaRepository<UserAccount, Integer>{
	
	public UserAccount findByEmail(String email);
}
