package edu.qs.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer custId;

    private String custName;

    private String custPhone; 
   

    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    public Customer() {
    }

    public Customer(String custName, String custPhone, Branch branch) {
        this.custName = custName;
        this.custPhone = custPhone;
        this.branch = branch;
    }

    public Integer getCustId() {
        return custId;
    }

    public void setCustId(Integer custId) {
        this.custId = custId;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getCustPhone() {
        return custPhone;
    }

    public void setCustPhone(String custPhone) {
        this.custPhone = custPhone;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "custId=" + custId +
                ", custName='" + custName + '\'' +
                ", custPhone='" + custPhone + '\'' +
                ", branch=" + (branch != null ? branch.getBranchId() : "null") +
                '}';
    }
}
