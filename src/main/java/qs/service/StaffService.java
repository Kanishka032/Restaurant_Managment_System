package edu.qs.service;

import edu.qs.model.entity.*;
import edu.qs.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class StaffService {

    private final CustomerRepository customerRepository;
    private final FoodOrderRepository foodOrderRepository;
    private final ItemRepository itemrepository;
    private final FoodProductRepository foodProductRepository;
    private final MenuRepository menuRepository;
    private final BranchRepository branchRepository;

    @Autowired
    public StaffService(CustomerRepository customerRepository, FoodOrderRepository foodOrderRepository, ItemRepository itemrepository, FoodProductRepository foodProductRepository, MenuRepository menuRepository, BranchRepository branchRepository) {
        this.customerRepository = customerRepository;
        this.foodOrderRepository = foodOrderRepository;
        this.itemrepository = itemrepository;
        this.foodProductRepository = foodProductRepository;
        this.menuRepository = menuRepository;
        this.branchRepository = branchRepository;
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Integer id) {
        return customerRepository.findById(id).orElse(null);
    }

    public void deleteCustomer(Integer id) {
        customerRepository.deleteById(id);
    }

    public List<Customer> searchbyPhone(String phone) {
        return customerRepository.findByCustPhoneContaining(phone);
    }

    @Transactional
    public FoodOrder placeOrder(Integer custId, List<Item> items) {
      
        Customer customer = customerRepository.findById(custId)
            .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + custId));

        Branch customerBranch = customer.getBranch();
        if (customerBranch == null) {
            throw new RuntimeException("Customer does not belong to any branch");
        }
        FoodOrder order = new FoodOrder();
        order.setStatus("Pending");
        order.setOrderCrtTime(LocalDateTime.now());
        order.setCustName(customer.getCustName());
        order.setCustContact(customer.getCustPhone());
        order.setCustomer(customer);
        order.setOrderDlvTime(order.getOrderCrtTime().plusMinutes(30));

        double totalPrice = 0;
        List<Item> savedItems = new ArrayList<>();
        for (Item item : items) {
            FoodProduct foodProduct = foodProductRepository.findById(item.getFoodProduct().getFoodProdId())
                .orElseThrow(() -> new RuntimeException("Food Product not found with ID: " + item.getFoodProduct().getFoodProdId()));

            if (!"Available".equalsIgnoreCase(foodProduct.getFoodProdAvailibility())) {
                throw new RuntimeException("❌ Food Product '" + foodProduct.getFoodProdName() + "' is not available.");
            }

            Menu menu = foodProduct.getMenu();
            if (menu == null || menu.getBranch() == null) {
                throw new RuntimeException("❌ Menu or branch data is missing for Food Product: " + foodProduct.getFoodProdId());
            }

            Branch menuBranch = menu.getBranch();

            System.out.println("Menu Branch ID: " + menuBranch.getBranchId());
            System.out.println("Customer Branch ID: " + customerBranch.getBranchId());


            item.setPrice(foodProduct.getFoodProdPrice() * item.getQuantity());
            item.setFoodOrder(order);
            savedItems.add(item);
            totalPrice += item.getPrice();
        }

        order.setTotalPrice(totalPrice);
        foodOrderRepository.save(order);
        itemrepository.saveAll(savedItems);

        return order;
    }
 // Fetch all orders
    public List<FoodOrder> getAllOrders() {
        return foodOrderRepository.findAll();
    }

    // Update order status
    @Transactional
    public FoodOrder updateOrderStatus(Integer orderId, String status) {
        FoodOrder order = foodOrderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setStatus(status);
        return foodOrderRepository.save(order);
    }

    public List<Menu> getMenuByBranch(Integer branchId) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found with ID: " + branchId));
        return menuRepository.findByBranch_BranchId(branchId);
    }

}