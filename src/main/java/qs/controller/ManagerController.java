package edu.qs.controller;

import edu.qs.model.entity.FoodOrder;
import edu.qs.model.entity.FoodProduct;
import edu.qs.model.entity.Menu;
import edu.qs.model.entity.User;
import edu.qs.repository.FoodProductRepository;
import edu.qs.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = "http://localhost:5174") 
public class ManagerController {

    private final ManagerService managerService;

  
    
    @Autowired
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping("/orders/total-price/{branchId}")
    public ResponseEntity<Double> getTotalOrderPriceByBranch(@PathVariable Integer branchId) {
        double totalPrice = managerService.getAllOrders().stream()
                .filter(order -> order.getCustomer() != null && order.getCustomer().getBranch() != null)
                .filter(order -> order.getCustomer().getBranch().getBranchId().equals(branchId))
                .mapToDouble(FoodOrder::getTotalPrice)
                .sum();
        
        return ResponseEntity.ok(totalPrice);
    }

 
    @GetMapping("/food-products/branch/{branchId}")
    public ResponseEntity<List<FoodProduct>> getFoodProductsByBranch(@PathVariable Integer branchId) {
        List<FoodProduct> foodProducts = managerService.getFoodProductsByBranchId(branchId);
        return ResponseEntity.ok(foodProducts);
    }

    @PutMapping("/food-product/update-availability/{foodProdId}")
    public ResponseEntity<String> updateFoodAvailability(
            @PathVariable Integer foodProdId,
            @RequestParam String availability) {
        String response = managerService.updateFoodAvailability(foodProdId, availability);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/orders")
    public ResponseEntity<List<FoodOrder>> getAllOrders() {
        return ResponseEntity.ok(managerService.getAllOrders());
    }
    @PostMapping("/menu/add")
    public String addMenu(@RequestBody Menu menu, @RequestParam Integer branchId) {
        return managerService.addMenu(menu, branchId);
    }

    @PutMapping("/menu/edit/{menuId}/{branchId}")
    public ResponseEntity<?> editMenu(
            @PathVariable Integer menuId,
            @PathVariable Integer branchId,
            @RequestBody Menu menu) {

        Menu updatedMenu = managerService.editMenu(
                menuId,
                branchId,
                menu.getDishName(),
                menu.getDishPrice(),
                menu.getDishCategory(),
                menu.getImageUrl()
        );

        return ResponseEntity.ok(updatedMenu);
    }


    @DeleteMapping("/menu/delete/{menuId}")
    public String deleteMenu(@PathVariable Integer menuId) {
        return managerService.deleteMenu(menuId);
    }
    @GetMapping("/menu/view")
    public List<Menu> viewMenu(@RequestParam Integer branchId) {
        return managerService.getMenuByBranchId(branchId);
    }
    @PostMapping("/staff/add")
    public ResponseEntity<?> addStaff(@RequestBody User user, @RequestParam Integer branchId) {
        return ResponseEntity.ok(managerService.addStaff(user, branchId));
    }

    @PutMapping("/staff/edit/{userId}/{branchId}")
    public ResponseEntity<String> editStaff(
            @PathVariable Integer userId,
            @PathVariable Integer branchId,
            @RequestBody User updatedUser) {
        String response = managerService.editStaff(userId, branchId, updatedUser);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/staff/remove/{userId}")
    public String removeStaff(@PathVariable Integer userId) {
        return managerService.removeStaff(userId);
    }

    @GetMapping("/staff/view")
    public List<User> viewAllStaff() {
        return managerService.viewAllStaff();
    }
}
