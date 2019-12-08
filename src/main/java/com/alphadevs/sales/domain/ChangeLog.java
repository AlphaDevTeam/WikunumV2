package com.alphadevs.sales.domain;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * ChangeLog Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "ChangeLog Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "change_log")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ChangeLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "change_key", nullable = false)
    private String changeKey;

    @NotNull
    @Column(name = "change_from", nullable = false)
    private String changeFrom;

    @NotNull
    @Column(name = "change_to", nullable = false)
    private String changeTo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChangeKey() {
        return changeKey;
    }

    public ChangeLog changeKey(String changeKey) {
        this.changeKey = changeKey;
        return this;
    }

    public void setChangeKey(String changeKey) {
        this.changeKey = changeKey;
    }

    public String getChangeFrom() {
        return changeFrom;
    }

    public ChangeLog changeFrom(String changeFrom) {
        this.changeFrom = changeFrom;
        return this;
    }

    public void setChangeFrom(String changeFrom) {
        this.changeFrom = changeFrom;
    }

    public String getChangeTo() {
        return changeTo;
    }

    public ChangeLog changeTo(String changeTo) {
        this.changeTo = changeTo;
        return this;
    }

    public void setChangeTo(String changeTo) {
        this.changeTo = changeTo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChangeLog)) {
            return false;
        }
        return id != null && id.equals(((ChangeLog) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ChangeLog{" +
            "id=" + getId() +
            ", changeKey='" + getChangeKey() + "'" +
            ", changeFrom='" + getChangeFrom() + "'" +
            ", changeTo='" + getChangeTo() + "'" +
            "}";
    }
}
