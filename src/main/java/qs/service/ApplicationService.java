package edu.qs.service;

import edu.qs.model.entity.Branch;
import edu.qs.model.entity.User;
import edu.qs.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BranchRepository branchRepository; 

  
    public String login(String email, String password, String role, Integer branchId) {
        Optional<User> existingUser = userRepository.findByUserEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            
            Optional<Branch> branchOptional = branchRepository.findById(branchId);
            if (branchOptional.isEmpty()) {
                return "Invalid branch ID.";
            }

           
            if (!user.getBranch().getBranchId().equals(branchId)) {
                return "User does not belong to this branch.";
            }

            if (user.getUserPwd().equals(password) && user.getUserRole().equalsIgnoreCase(role)) {
                return "Login successful as " + role;
            } else {
                return "Invalid password or role.";
            }
        }
        return "User not found.";
    }

}
