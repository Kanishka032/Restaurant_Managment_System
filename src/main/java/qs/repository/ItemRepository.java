package edu.qs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.qs.model.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

}
