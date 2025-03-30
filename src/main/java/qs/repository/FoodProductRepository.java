package edu.qs.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.qs.model.entity.FoodProduct;

import java.util.List;

@Repository
public interface FoodProductRepository extends JpaRepository<FoodProduct, Integer> {

    List<FoodProduct> findByFoodProdIdInAndFoodProdAvailibility(List<Integer> foodProdIds, String availability);

    
    @Query("SELECT fp FROM FoodProduct fp WHERE fp.menu.branch.branchId = :branchId")
    List<FoodProduct> findFoodProductsByBranchId(Integer branchId);
}
