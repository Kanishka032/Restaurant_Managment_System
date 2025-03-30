package edu.qs.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import edu.qs.model.entity.Customer;
import edu.qs.model.entity.FoodOrder;
import edu.qs.model.entity.Item;
import edu.qs.model.entity.Menu;
import edu.qs.repository.CustomerRepository;
import edu.qs.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffController {

    private final StaffService staffService;
private final CustomerRepository customerReposiotry;
    @Autowired
    
    public StaffController(StaffService staffService, CustomerRepository customerReposiotry) {
        this.staffService = staffService;
        this.customerReposiotry= customerReposiotry;
    }
    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = staffService.addCustomer(customer);
        return ResponseEntity.ok(savedCustomer);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = staffService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Customer customer = staffService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Integer id, @RequestBody Customer updatedCustomer) {
        try {
            Customer existingCustomer = customerReposiotry.findById(id)
                    .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

            if (updatedCustomer.getCustName() != null) {
                existingCustomer.setCustName(updatedCustomer.getCustName());
            }
            if (updatedCustomer.getCustPhone() != null) {
                existingCustomer.setCustPhone(updatedCustomer.getCustPhone());
            }

            customerReposiotry.save(existingCustomer);
            return ResponseEntity.ok(existingCustomer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating customer: " + e.getMessage());
        }
    }

  
   
    @GetMapping("/search")
    public ResponseEntity<List<Customer>> searchCustomers(@RequestParam String phone) {
        List<Customer> customers = staffService.searchbyPhone(phone);
        return ResponseEntity.ok(customers);
    }
    
   
    @PostMapping("/place-order/{custId}")
    public ResponseEntity<?> placeOrder(@PathVariable Integer custId, @RequestBody List<Item> orderItems) {
        System.out.println("Received order request for customer ID: " + custId);
        System.out.println("Received order items: " + orderItems);

        if (orderItems != null) {
            for (Item item : orderItems) {
                System.out.println("Item: " + item);
                System.out.println("Food Product ID: " + item.getFoodProduct().getFoodProdId());
                System.out.println("Quantity: " + item.getQuantity());
            }
        }

        try {
            FoodOrder foodOrder = staffService.placeOrder(custId, orderItems);
            System.out.println("Order placed successfully: " + foodOrder);
            return ResponseEntity.ok(foodOrder);
        } catch (IllegalArgumentException e) {
            System.err.println("IllegalArgumentException: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error placing order: " + e.getMessage());
        }
    }
    
    @GetMapping("/menu/{branchId}")
    public ResponseEntity<?> getMenuByBranch(@PathVariable Integer branchId) {
        try {
            List<Menu> menuList = staffService.getMenuByBranch(branchId);
            return ResponseEntity.ok(menuList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching menu: " + e.getMessage());
        }
    }
    @GetMapping("/orders")
    public ResponseEntity<List<FoodOrder>> getAllOrders() {
        List<FoodOrder> orders = staffService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/update-order-status/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Integer orderId, @RequestParam String status) {
        try {
            FoodOrder updatedOrder = staffService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order status: " + e.getMessage());
        }
    }



}
