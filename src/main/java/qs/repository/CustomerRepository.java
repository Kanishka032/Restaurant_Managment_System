package edu.qs.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.qs.model.entity.Customer;
import edu.qs.model.entity.Menu;

public interface CustomerRepository extends  JpaRepository<Customer, Integer>{

	boolean existsByCustPhone(String custPhone);
	  List<Customer> findByCustPhoneContaining(String custPhone);
	

}
