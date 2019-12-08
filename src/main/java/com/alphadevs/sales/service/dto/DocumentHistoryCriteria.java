package com.alphadevs.sales.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link com.alphadevs.sales.domain.DocumentHistory} entity. This class is used
 * in {@link com.alphadevs.sales.web.rest.DocumentHistoryResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /document-histories?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class DocumentHistoryCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter historyDescription;

    private LocalDateFilter historyDate;

    private LongFilter typeId;

    private LongFilter userId;

    private LongFilter changeLogId;

    public DocumentHistoryCriteria(){
    }

    public DocumentHistoryCriteria(DocumentHistoryCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.historyDescription = other.historyDescription == null ? null : other.historyDescription.copy();
        this.historyDate = other.historyDate == null ? null : other.historyDate.copy();
        this.typeId = other.typeId == null ? null : other.typeId.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.changeLogId = other.changeLogId == null ? null : other.changeLogId.copy();
    }

    @Override
    public DocumentHistoryCriteria copy() {
        return new DocumentHistoryCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getHistoryDescription() {
        return historyDescription;
    }

    public void setHistoryDescription(StringFilter historyDescription) {
        this.historyDescription = historyDescription;
    }

    public LocalDateFilter getHistoryDate() {
        return historyDate;
    }

    public void setHistoryDate(LocalDateFilter historyDate) {
        this.historyDate = historyDate;
    }

    public LongFilter getTypeId() {
        return typeId;
    }

    public void setTypeId(LongFilter typeId) {
        this.typeId = typeId;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getChangeLogId() {
        return changeLogId;
    }

    public void setChangeLogId(LongFilter changeLogId) {
        this.changeLogId = changeLogId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final DocumentHistoryCriteria that = (DocumentHistoryCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(historyDescription, that.historyDescription) &&
            Objects.equals(historyDate, that.historyDate) &&
            Objects.equals(typeId, that.typeId) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(changeLogId, that.changeLogId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        historyDescription,
        historyDate,
        typeId,
        userId,
        changeLogId
        );
    }

    @Override
    public String toString() {
        return "DocumentHistoryCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (historyDescription != null ? "historyDescription=" + historyDescription + ", " : "") +
                (historyDate != null ? "historyDate=" + historyDate + ", " : "") +
                (typeId != null ? "typeId=" + typeId + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
                (changeLogId != null ? "changeLogId=" + changeLogId + ", " : "") +
            "}";
    }

}