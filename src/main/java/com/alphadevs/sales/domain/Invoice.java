package com.alphadevs.sales.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * Invoice Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "Invoice Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "invoice")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "inv_number", nullable = false)
    private String invNumber;

    @NotNull
    @Column(name = "inv_date", nullable = false)
    private LocalDate invDate;

    @OneToMany(mappedBy = "inv")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<InvoiceDetails> details = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("invoices")
    private Items item;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("invoices")
    private Location location;

    @ManyToOne
    @JsonIgnoreProperties("invoices")
    private DocumentHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvNumber() {
        return invNumber;
    }

    public Invoice invNumber(String invNumber) {
        this.invNumber = invNumber;
        return this;
    }

    public void setInvNumber(String invNumber) {
        this.invNumber = invNumber;
    }

    public LocalDate getInvDate() {
        return invDate;
    }

    public Invoice invDate(LocalDate invDate) {
        this.invDate = invDate;
        return this;
    }

    public void setInvDate(LocalDate invDate) {
        this.invDate = invDate;
    }

    public Set<InvoiceDetails> getDetails() {
        return details;
    }

    public Invoice details(Set<InvoiceDetails> invoiceDetails) {
        this.details = invoiceDetails;
        return this;
    }

    public Invoice addDetails(InvoiceDetails invoiceDetails) {
        this.details.add(invoiceDetails);
        invoiceDetails.setInv(this);
        return this;
    }

    public Invoice removeDetails(InvoiceDetails invoiceDetails) {
        this.details.remove(invoiceDetails);
        invoiceDetails.setInv(null);
        return this;
    }

    public void setDetails(Set<InvoiceDetails> invoiceDetails) {
        this.details = invoiceDetails;
    }

    public Items getItem() {
        return item;
    }

    public Invoice item(Items items) {
        this.item = items;
        return this;
    }

    public void setItem(Items items) {
        this.item = items;
    }

    public Location getLocation() {
        return location;
    }

    public Invoice location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public Invoice history(DocumentHistory documentHistory) {
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
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", invNumber='" + getInvNumber() + "'" +
            ", invDate='" + getInvDate() + "'" +
            "}";
    }
}
