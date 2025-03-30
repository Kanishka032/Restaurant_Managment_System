package edu.qs.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer menuId;

    @Column(name = "dish_name", nullable = false, length = 255)
    private String dishName;

    @Column(name = "dish_price", nullable = false)
    private Double dishPrice;

    @Column(name = "dish_category", length = 100)
    private String dishCategory;

    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;  

    @Column(name = "image_url", nullable = true, length = 2048)
    private String imageUrl;
 

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public Double getDishPrice() {
        return dishPrice;
    }

    public void setDishPrice(Double dishPrice) {
        this.dishPrice = dishPrice;
    }

    public String getDishCategory() {
        return dishCategory;
    }

    public void setDishCategory(String dishCategory) {
        this.dishCategory = dishCategory;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "menuId=" + menuId +
                ", dishName='" + dishName + '\'' +
                ", dishPrice=" + dishPrice +
                ", dishCategory='" + dishCategory + '\'' +
                ", branch=" + branch +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}