package com.alphadevs.sales.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * TransactionType Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "TransactionType Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "transaction_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransactionType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "transactionype_code", nullable = false)
    private String transactionypeCode;

    @NotNull
    @Column(name = "transaction_type", nullable = false)
    private String transactionType;

    @Column(name = "is_active")
    private Boolean isActive;

    @ManyToOne
    @JsonIgnoreProperties("transactionTypes")
    private DocumentHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionypeCode() {
        return transactionypeCode;
    }

    public TransactionType transactionypeCode(String transactionypeCode) {
        this.transactionypeCode = transactionypeCode;
        return this;
    }

    public void setTransactionypeCode(String transactionypeCode) {
        this.transactionypeCode = transactionypeCode;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public TransactionType transactionType(String transactionType) {
        this.transactionType = transactionType;
        return this;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public TransactionType isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public TransactionType history(DocumentHistory documentHistory) {
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
        if (!(o instanceof TransactionType)) {
            return false;
        }
        return id != null && id.equals(((TransactionType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TransactionType{" +
            "id=" + getId() +
            ", transactionypeCode='" + getTransactionypeCode() + "'" +
            ", transactionType='" + getTransactionType() + "'" +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
