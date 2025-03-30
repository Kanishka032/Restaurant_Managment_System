package edu.qs.repository;

import edu.qs.model.entity.Branch;
import edu.qs.model.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
    boolean existsByBranch_BranchId(Integer branchId);
    List<Menu> findByBranch_BranchId(Integer branchId);
    Menu findByDishNameAndBranch(String dishName, Branch branch);
 
}
