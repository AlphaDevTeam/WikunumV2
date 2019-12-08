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
 * Supplier Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "Supplier Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "supplier")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Supplier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "supplier_code", nullable = false)
    private String supplierCode;

    @NotNull
    @Column(name = "supplier_name", nullable = false)
    private String supplierName;

    @NotNull
    @Column(name = "supplier_credit_limit", precision = 21, scale = 2, nullable = false)
    private BigDecimal supplierCreditLimit;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "rating")
    private Double rating;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("suppliers")
    private Location location;

    @ManyToOne
    @JsonIgnoreProperties("suppliers")
    private DocumentHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSupplierCode() {
        return supplierCode;
    }

    public Supplier supplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
        return this;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public Supplier supplierName(String supplierName) {
        this.supplierName = supplierName;
        return this;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public BigDecimal getSupplierCreditLimit() {
        return supplierCreditLimit;
    }

    public Supplier supplierCreditLimit(BigDecimal supplierCreditLimit) {
        this.supplierCreditLimit = supplierCreditLimit;
        return this;
    }

    public void setSupplierCreditLimit(BigDecimal supplierCreditLimit) {
        this.supplierCreditLimit = supplierCreditLimit;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Supplier isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getRating() {
        return rating;
    }

    public Supplier rating(Double rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Location getLocation() {
        return location;
    }

    public Supplier location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public Supplier history(DocumentHistory documentHistory) {
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
        if (!(o instanceof Supplier)) {
            return false;
        }
        return id != null && id.equals(((Supplier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Supplier{" +
            "id=" + getId() +
            ", supplierCode='" + getSupplierCode() + "'" +
            ", supplierName='" + getSupplierName() + "'" +
            ", supplierCreditLimit=" + getSupplierCreditLimit() +
            ", isActive='" + isIsActive() + "'" +
            ", rating=" + getRating() +
            "}";
    }
}
