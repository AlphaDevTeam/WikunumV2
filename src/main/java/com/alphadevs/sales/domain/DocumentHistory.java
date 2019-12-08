package com.alphadevs.sales.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DocumentHistory Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "DocumentHistory Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "document_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DocumentHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "history_description", nullable = false)
    private String historyDescription;

    @NotNull
    @Column(name = "history_date", nullable = false)
    private LocalDate historyDate;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("documentHistories")
    private DocumentType type;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("documentHistories")
    private ExUser user;

    @ManyToOne
    @JsonIgnoreProperties("documentHistories")
    private ChangeLog changeLog;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHistoryDescription() {
        return historyDescription;
    }

    public DocumentHistory historyDescription(String historyDescription) {
        this.historyDescription = historyDescription;
        return this;
    }

    public void setHistoryDescription(String historyDescription) {
        this.historyDescription = historyDescription;
    }

    public LocalDate getHistoryDate() {
        return historyDate;
    }

    public DocumentHistory historyDate(LocalDate historyDate) {
        this.historyDate = historyDate;
        return this;
    }

    public void setHistoryDate(LocalDate historyDate) {
        this.historyDate = historyDate;
    }

    public DocumentType getType() {
        return type;
    }

    public DocumentHistory type(DocumentType documentType) {
        this.type = documentType;
        return this;
    }

    public void setType(DocumentType documentType) {
        this.type = documentType;
    }

    public ExUser getUser() {
        return user;
    }

    public DocumentHistory user(ExUser exUser) {
        this.user = exUser;
        return this;
    }

    public void setUser(ExUser exUser) {
        this.user = exUser;
    }

    public ChangeLog getChangeLog() {
        return changeLog;
    }

    public DocumentHistory changeLog(ChangeLog changeLog) {
        this.changeLog = changeLog;
        return this;
    }

    public void setChangeLog(ChangeLog changeLog) {
        this.changeLog = changeLog;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentHistory)) {
            return false;
        }
        return id != null && id.equals(((DocumentHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DocumentHistory{" +
            "id=" + getId() +
            ", historyDescription='" + getHistoryDescription() + "'" +
            ", historyDate='" + getHistoryDate() + "'" +
            "}";
    }
}
