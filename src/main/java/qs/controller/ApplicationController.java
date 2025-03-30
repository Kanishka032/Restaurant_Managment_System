package edu.qs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.qs.model.entity.User;
import edu.qs.service.ApplicationService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5174")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

   
    @PostMapping("/login")
    public String loginUser(
        @RequestParam String email, 
        @RequestParam String password, 
        @RequestParam String role,
        @RequestParam(name = "branch") Integer branchId 
    ) {
        return applicationService.login(email, password, role, branchId);
    }

}
