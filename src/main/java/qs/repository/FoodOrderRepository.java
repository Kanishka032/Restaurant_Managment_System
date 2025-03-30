package edu.qs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.qs.model.entity.FoodOrder;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Integer> {
}
