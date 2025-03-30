package edu.qs.model.entity;

import jakarta.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Food_Order")
public class FoodOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodOrderId;

    private String status;
    private Double totalPrice;
    private LocalDateTime orderCrtTime;

    @Column(name = "order_dlv_time")
    private Date orderDlvTime;

    private String custName;

    @Column(name = "cust_contact")
    private String custContact; 

    @ManyToOne
    @JoinColumn(name = "cust_id")
    private Customer customer;

    @OneToMany(mappedBy = "foodOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items;

    public Integer getFoodOrderId() { return foodOrderId; }
    public void setFoodOrderId(Integer foodOrderId) { this.foodOrderId = foodOrderId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDateTime getOrderCrtTime() { return orderCrtTime; }
    public void setOrderCrtTime(LocalDateTime orderCrtTime) { this.orderCrtTime = orderCrtTime; }

    public Date getOrderDlvTime() { return orderDlvTime; }
    public void setOrderDlvTime(LocalDateTime orderDlvTime) {
        if (orderDlvTime != null) {
            this.orderDlvTime = Date.valueOf(orderDlvTime.toLocalDate());
        }
    }

    public String getCustName() { return custName; }
    public void setCustName(String custName) { this.custName = custName; }

    public String getCustContact() { return custContact; } 
    public void setCustContact(String custContact) { this.custContact = custContact; }  
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }

}
