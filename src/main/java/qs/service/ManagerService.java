package edu.qs.service;

import edu.qs.model.entity.Menu;
import edu.qs.model.entity.Branch;
import edu.qs.model.entity.FoodOrder;
import edu.qs.model.entity.FoodProduct;
import edu.qs.model.entity.Item;
import edu.qs.model.entity.User;
import edu.qs.repository.MenuRepository;
import edu.qs.repository.BranchRepository;
import edu.qs.repository.CustomerRepository;
import edu.qs.repository.FoodOrderRepository;
import edu.qs.repository.FoodProductRepository;
import edu.qs.repository.ItemRepository;
import edu.qs.repository.UserRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.time.LocalDate;
import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FoodProductRepository foodProductRepository;
    @Autowired
    private FoodOrderRepository foodOrderRepository;

    public List<FoodProduct> getAllFoodProducts() {
        return foodProductRepository.findAll();
    }

    public String addMenu(Menu menu, Integer branchId) {
      
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        Menu existingMenu = menuRepository.findByDishNameAndBranch(menu.getDishName(), branch);
        if (existingMenu != null) {
            return "Menu already exists for this branch";
        }

        menu.setBranch(branch);
        menuRepository.save(menu);
        
        return "Menu added successfully";
    }
    public List<FoodOrder> getAllOrders() {
        return foodOrderRepository.findAll();
    }
    
    public List<FoodProduct> getFoodProductsByBranchId(Integer branchId) {
        return foodProductRepository.findFoodProductsByBranchId(branchId);
    }
    public String updateFoodAvailability1(Integer foodProdId, String availability) {
        Optional<FoodProduct> optionalProduct = foodProductRepository.findById(foodProdId);
        
        if (optionalProduct.isPresent()) {
            FoodProduct product = optionalProduct.get();
            product.setFoodProdAvailibility(availability);
            foodProductRepository.save(product);
            return "Food Product availability updated successfully!";
        } else {
            return "Food Product not found!";
        }
    }
    public String deleteMenu(Integer menuId) {
        if (menuRepository.existsById(menuId)) {
            menuRepository.deleteById(menuId);
            return "Menu deleted successfully!";
        }
        return "Menu not found!";
    }

    public List<Menu> getMenuByBranchId(Integer branchId) {
        return menuRepository.findByBranch_BranchId(branchId);
    }
  

    public String addStaff(User user, Integer branchId) {
   
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

   
        Optional<User> existingUser = userRepository.findByUserEmailAndBranch(user.getUserEmail(), branch);
        if (existingUser.isPresent()) {
            return "User already exists in this branch!";
        }

        user.setUserRole("STAFF");
        user.setBranch(branch);

        if (user.getUserName() == null || user.getUserName().isEmpty() ||
            user.getUserEmail() == null || user.getUserEmail().isEmpty() ||
            user.getUserContact() == null || user.getUserContact().isEmpty() ||
            user.getUserAddr() == null || user.getUserAddr().isEmpty() ||
            user.getUserGender() == null || user.getUserGender().isEmpty() ||
            user.getUserDob() == null ||
            user.getUserAge() == null ||
            user.getUserSalary() == null ||
            user.getUserPwd() == null || user.getUserPwd().isEmpty()) {
            return "All fields are required!";
        }
        userRepository.save(user);

        return "Staff added successfully!";
    }


    public String editStaff(Integer userId, Integer branchId, User updatedUser) {
      
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        existingUser.setUserName(updatedUser.getUserName());
        existingUser.setUserEmail(updatedUser.getUserEmail());
        existingUser.setUserContact(updatedUser.getUserContact());
        existingUser.setUserAddr(updatedUser.getUserAddr());
        existingUser.setUserGender(updatedUser.getUserGender());
        existingUser.setUserDob(updatedUser.getUserDob());
        existingUser.setUserAge(updatedUser.getUserAge());
        existingUser.setUserSalary(updatedUser.getUserSalary());
        existingUser.setUserPwd(updatedUser.getUserPwd());
        existingUser.setUserRole(updatedUser.getUserRole());
        
        existingUser.setBranch(branch);

        userRepository.save(existingUser);

        return "Staff details updated successfully!";
    }

    public String removeStaff(Integer userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return "Staff removed successfully!";
        }
        return "Staff not found!";
    }
    public String updateFoodAvailability(Integer foodProdId, String availability) {
        Optional<FoodProduct> optionalFoodProduct = foodProductRepository.findById(foodProdId);

        if (optionalFoodProduct.isPresent()) {
            FoodProduct foodProduct = optionalFoodProduct.get();
            foodProduct.setFoodProdAvailibility(availability);
            foodProductRepository.save(foodProduct);
            return "Food product availability updated successfully!";
        } else {
            return "Food product not found!";
        }
    }
    public List<User> viewAllStaff() {
        return userRepository.findAllStaffWithBranch();
    }


    public Menu editMenu(Integer menuId, Integer branchId, String dishName, Double price, String dishCategory,String ImageUrl) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Menu not found"));

        menu.setDishName(dishName);
        menu.setDishPrice(price);
        menu.setDishCategory(dishCategory);
menu.setImageUrl(ImageUrl);
        menu.setBranch(branch);

        return menuRepository.save(menu);
    }
   

}
