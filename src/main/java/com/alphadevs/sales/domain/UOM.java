package com.alphadevs.sales.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * UOM Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "UOM Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "uom")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UOM implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "uom_code", nullable = false)
    private String uomCode;

    @NotNull
    @Column(name = "uom_description", nullable = false)
    private String uomDescription;

    @ManyToOne
    @JsonIgnoreProperties("uOMS")
    private DocumentHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUomCode() {
        return uomCode;
    }

    public UOM uomCode(String uomCode) {
        this.uomCode = uomCode;
        return this;
    }

    public void setUomCode(String uomCode) {
        this.uomCode = uomCode;
    }

    public String getUomDescription() {
        return uomDescription;
    }

    public UOM uomDescription(String uomDescription) {
        this.uomDescription = uomDescription;
        return this;
    }

    public void setUomDescription(String uomDescription) {
        this.uomDescription = uomDescription;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public UOM history(DocumentHistory documentHistory) {
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
        if (!(o instanceof UOM)) {
            return false;
        }
        return id != null && id.equals(((UOM) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UOM{" +
            "id=" + getId() +
            ", uomCode='" + getUomCode() + "'" +
            ", uomDescription='" + getUomDescription() + "'" +
            "}";
    }
}
