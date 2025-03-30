package edu.qs.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "Item")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    private Integer quantity;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "food_order_id")
    @JsonIgnore
    private FoodOrder foodOrder;

    @ManyToOne
    @JoinColumn(name = "food_prod_id")
    private FoodProduct foodProduct;

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public FoodOrder getFoodOrder() {
        return foodOrder;
    }

    public void setFoodOrder(FoodOrder foodOrder) {
        this.foodOrder = foodOrder;
    }

    public FoodProduct getFoodProduct() {
        return foodProduct;
    }

    public void setFoodProduct(FoodProduct foodProduct) {
        this.foodProduct = foodProduct;
    }
}
