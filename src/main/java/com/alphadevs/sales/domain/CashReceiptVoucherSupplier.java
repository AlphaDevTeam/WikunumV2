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
 * CashReceiptVoucherSupplier Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "CashReceiptVoucherSupplier Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "cash_receipt_voucher_supplier")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CashReceiptVoucherSupplier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;

    @NotNull
    @Column(name = "transaction_description", nullable = false)
    private String transactionDescription;

    @NotNull
    @Column(name = "transaction_amount_dr", precision = 21, scale = 2, nullable = false)
    private BigDecimal transactionAmountDR;

    @NotNull
    @Column(name = "transaction_amount_cr", precision = 21, scale = 2, nullable = false)
    private BigDecimal transactionAmountCR;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("cashReceiptVoucherSuppliers")
    private Location location;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("cashReceiptVoucherSuppliers")
    private TransactionType transactionType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("cashReceiptVoucherSuppliers")
    private Supplier supplier;

    @ManyToOne
    @JsonIgnoreProperties("cashReceiptVoucherSuppliers")
    private DocumentHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public CashReceiptVoucherSupplier transactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
        return this;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionDescription() {
        return transactionDescription;
    }

    public CashReceiptVoucherSupplier transactionDescription(String transactionDescription) {
        this.transactionDescription = transactionDescription;
        return this;
    }

    public void setTransactionDescription(String transactionDescription) {
        this.transactionDescription = transactionDescription;
    }

    public BigDecimal getTransactionAmountDR() {
        return transactionAmountDR;
    }

    public CashReceiptVoucherSupplier transactionAmountDR(BigDecimal transactionAmountDR) {
        this.transactionAmountDR = transactionAmountDR;
        return this;
    }

    public void setTransactionAmountDR(BigDecimal transactionAmountDR) {
        this.transactionAmountDR = transactionAmountDR;
    }

    public BigDecimal getTransactionAmountCR() {
        return transactionAmountCR;
    }

    public CashReceiptVoucherSupplier transactionAmountCR(BigDecimal transactionAmountCR) {
        this.transactionAmountCR = transactionAmountCR;
        return this;
    }

    public void setTransactionAmountCR(BigDecimal transactionAmountCR) {
        this.transactionAmountCR = transactionAmountCR;
    }

    public Location getLocation() {
        return location;
    }

    public CashReceiptVoucherSupplier location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public CashReceiptVoucherSupplier transactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
        return this;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public CashReceiptVoucherSupplier supplier(Supplier supplier) {
        this.supplier = supplier;
        return this;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public CashReceiptVoucherSupplier history(DocumentHistory documentHistory) {
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
        if (!(o instanceof CashReceiptVoucherSupplier)) {
            return false;
        }
        return id != null && id.equals(((CashReceiptVoucherSupplier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CashReceiptVoucherSupplier{" +
            "id=" + getId() +
            ", transactionDate='" + getTransactionDate() + "'" +
            ", transactionDescription='" + getTransactionDescription() + "'" +
            ", transactionAmountDR=" + getTransactionAmountDR() +
            ", transactionAmountCR=" + getTransactionAmountCR() +
            "}";
    }
}
