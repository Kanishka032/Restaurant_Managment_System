package edu.qs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.qs.model.entity.Branch;
import edu.qs.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserEmail(String userEmail);
    List<User> findByUserRole(String userRole); 
    Optional<User> findByUserEmailAndBranch(String userEmail, Branch branch);
    @Query("SELECT u FROM User u JOIN FETCH u.branch WHERE u.userRole = 'STAFF'")
    List<User> findAllStaffWithBranch();


}
