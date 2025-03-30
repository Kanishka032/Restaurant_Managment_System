package edu.qs.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.qs.model.entity.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer> {
	
}
