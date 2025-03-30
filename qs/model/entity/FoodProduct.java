package edu.qs.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Food_Product")
public class FoodProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodProdId;

    private String foodProdName;
    private String foodProdType;
    private String foodProdAbout;
    private String foodProdAvailibility;
    private Double foodProdPrice;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;

	public Integer getFoodProdId() {
		return foodProdId;
	}

	public void setFoodProdId(Integer foodProdId) {
		this.foodProdId = foodProdId;
	}

	public String getFoodProdName() {
		return foodProdName;
	}

	public void setFoodProdName(String foodProdName) {
		this.foodProdName = foodProdName;
	}

	public String getFoodProdType() {
		return foodProdType;
	}

	public void setFoodProdType(String foodProdType) {
		this.foodProdType = foodProdType;
	}

	public String getFoodProdAbout() {
		return foodProdAbout;
	}

	public void setFoodProdAbout(String foodProdAbout) {
		this.foodProdAbout = foodProdAbout;
	}

	public String getFoodProdAvailibility() {
		return foodProdAvailibility;
	}

	public void setFoodProdAvailibility(String foodProdAvailibility) {
		this.foodProdAvailibility = foodProdAvailibility;
	}

	public Double getFoodProdPrice() {
		return foodProdPrice;
	}

	public void setFoodProdPrice(Double foodProdPrice) {
		this.foodProdPrice = foodProdPrice;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	
}
