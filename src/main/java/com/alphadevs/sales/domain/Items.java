package com.alphadevs.sales.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Items Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "Items Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "items")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Items implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "item_code", nullable = false)
    private String itemCode;

    @NotNull
    @Column(name = "item_name", nullable = false)
    private String itemName;

    @NotNull
    @Column(name = "item_description", nullable = false)
    private String itemDescription;

    @Column(name = "item_price", precision = 21, scale = 2)
    private BigDecimal itemPrice;

    @NotNull
    @Column(name = "item_serial", nullable = false)
    private String itemSerial;

    @Column(name = "item_supplier_serial")
    private String itemSupplierSerial;

    @NotNull
    @Column(name = "item_cost", precision = 21, scale = 2, nullable = false)
    private BigDecimal itemCost;

    @NotNull
    @Column(name = "original_stock_date", nullable = false)
    private LocalDate originalStockDate;

    @NotNull
    @Column(name = "modified_stock_date", nullable = false)
    private LocalDate modifiedStockDate;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("items")
    private Designs relatedDesign;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("items")
    private Products relatedProduct;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("items")
    private Location location;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("items")
    private UOM uOM;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("items")
    private Currency currency;

    @ManyToOne
    @JsonIgnoreProperties("items")
    private ItemAddOns addons;

    @ManyToOne
    @JsonIgnoreProperties("items")
    private DocumentHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemCode() {
        return itemCode;
    }

    public Items itemCode(String itemCode) {
        this.itemCode = itemCode;
        return this;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemName() {
        return itemName;
    }

    public Items itemName(String itemName) {
        this.itemName = itemName;
        return this;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public Items itemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
        return this;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public BigDecimal getItemPrice() {
        return itemPrice;
    }

    public Items itemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
        return this;
    }

    public void setItemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getItemSerial() {
        return itemSerial;
    }

    public Items itemSerial(String itemSerial) {
        this.itemSerial = itemSerial;
        return this;
    }

    public void setItemSerial(String itemSerial) {
        this.itemSerial = itemSerial;
    }

    public String getItemSupplierSerial() {
        return itemSupplierSerial;
    }

    public Items itemSupplierSerial(String itemSupplierSerial) {
        this.itemSupplierSerial = itemSupplierSerial;
        return this;
    }

    public void setItemSupplierSerial(String itemSupplierSerial) {
        this.itemSupplierSerial = itemSupplierSerial;
    }

    public BigDecimal getItemCost() {
        return itemCost;
    }

    public Items itemCost(BigDecimal itemCost) {
        this.itemCost = itemCost;
        return this;
    }

    public void setItemCost(BigDecimal itemCost) {
        this.itemCost = itemCost;
    }

    public LocalDate getOriginalStockDate() {
        return originalStockDate;
    }

    public Items originalStockDate(LocalDate originalStockDate) {
        this.originalStockDate = originalStockDate;
        return this;
    }

    public void setOriginalStockDate(LocalDate originalStockDate) {
        this.originalStockDate = originalStockDate;
    }

    public LocalDate getModifiedStockDate() {
        return modifiedStockDate;
    }

    public Items modifiedStockDate(LocalDate modifiedStockDate) {
        this.modifiedStockDate = modifiedStockDate;
        return this;
    }

    public void setModifiedStockDate(LocalDate modifiedStockDate) {
        this.modifiedStockDate = modifiedStockDate;
    }

    public byte[] getImage() {
        return image;
    }

    public Items image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Items imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Designs getRelatedDesign() {
        return relatedDesign;
    }

    public Items relatedDesign(Designs designs) {
        this.relatedDesign = designs;
        return this;
    }

    public void setRelatedDesign(Designs designs) {
        this.relatedDesign = designs;
    }

    public Products getRelatedProduct() {
        return relatedProduct;
    }

    public Items relatedProduct(Products products) {
        this.relatedProduct = products;
        return this;
    }

    public void setRelatedProduct(Products products) {
        this.relatedProduct = products;
    }

    public Location getLocation() {
        return location;
    }

    public Items location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public UOM getUOM() {
        return uOM;
    }

    public Items uOM(UOM uOM) {
        this.uOM = uOM;
        return this;
    }

    public void setUOM(UOM uOM) {
        this.uOM = uOM;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Items currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public ItemAddOns getAddons() {
        return addons;
    }

    public Items addons(ItemAddOns itemAddOns) {
        this.addons = itemAddOns;
        return this;
    }

    public void setAddons(ItemAddOns itemAddOns) {
        this.addons = itemAddOns;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public Items history(DocumentHistory documentHistory) {
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
        if (!(o instanceof Items)) {
            return false;
        }
        return id != null && id.equals(((Items) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Items{" +
            "id=" + getId() +
            ", itemCode='" + getItemCode() + "'" +
            ", itemName='" + getItemName() + "'" +
            ", itemDescription='" + getItemDescription() + "'" +
            ", itemPrice=" + getItemPrice() +
            ", itemSerial='" + getItemSerial() + "'" +
            ", itemSupplierSerial='" + getItemSupplierSerial() + "'" +
            ", itemCost=" + getItemCost() +
            ", originalStockDate='" + getOriginalStockDate() + "'" +
            ", modifiedStockDate='" + getModifiedStockDate() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
