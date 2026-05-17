package com.zosh.service;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ActiveUserService {

    private final Set<String> activeUsers = new HashSet<>();

    public void login(String email){
        activeUsers.add(email);
    }

    public void logout(String email){
        activeUsers.remove(email);
    }

    public int getActiveUsers(){
        return activeUsers.size();
    }
}