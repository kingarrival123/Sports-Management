package com.example.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.model.UserAccount;
import com.example.repository.UserRepo;

@Service
public class InMemoryUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepo userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (username != null) {
			UserAccount user = userRepo.findByEmail(username);
			System.out.println(user);
			if (username != null)
				return new User(user.getEmail(),user.getPassword(), new ArrayList<>());
			else
				throw new UsernameNotFoundException("User Name Not Exist");
		}

		return null;
	}
	
}
