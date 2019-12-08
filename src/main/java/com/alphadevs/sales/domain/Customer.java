package com.alphadevs.sales.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Customer Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "Customer Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "customer_code", nullable = false)
    private String customerCode;

    @NotNull
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @NotNull
    @Column(name = "customer_credit_limit", precision = 21, scale = 2, nullable = false)
    private BigDecimal customerCreditLimit;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "rating")
    private Double rating;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("customers")
    private Location location;

    @ManyToOne
    @JsonIgnoreProperties("customers")
    private DocumentHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public Customer customerCode(String customerCode) {
        this.customerCode = customerCode;
        return this;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Customer customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public BigDecimal getCustomerCreditLimit() {
        return customerCreditLimit;
    }

    public Customer customerCreditLimit(BigDecimal customerCreditLimit) {
        this.customerCreditLimit = customerCreditLimit;
        return this;
    }

    public void setCustomerCreditLimit(BigDecimal customerCreditLimit) {
        this.customerCreditLimit = customerCreditLimit;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Customer isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getRating() {
        return rating;
    }

    public Customer rating(Double rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Location getLocation() {
        return location;
    }

    public Customer location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public Customer history(DocumentHistory documentHistory) {
        this.history = documentHistory;
        return this;
    }

    public void setHistory(DocumentHistory documentHistory) {
        this.history = documentHistory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", customerCode='" + getCustomerCode() + "'" +
            ", customerName='" + getCustomerName() + "'" +
            ", customerCreditLimit=" + getCustomerCreditLimit() +
            ", isActive='" + isIsActive() + "'" +
            ", rating=" + getRating() +
            "}";
    }
}
