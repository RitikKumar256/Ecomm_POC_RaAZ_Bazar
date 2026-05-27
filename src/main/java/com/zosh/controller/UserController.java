package com.zosh.controller;

import com.zosh.dto.UpdateProfileRequest;
import com.zosh.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zosh.exception.UserException;

import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(
			@RequestHeader("Authorization") String jwt) throws UserException{

		System.out.println("/api/users/profile");
		User user=userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
	}
	@PutMapping("/profile")
	public ResponseEntity<User> updateUserProfileHandler(
			@RequestHeader("Authorization") String jwt,
			@RequestBody UpdateProfileRequest request
	) throws UserException {

		User updatedUser = userService.updateUserProfile(jwt, request);

		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}

}
