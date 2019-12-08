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

/**
 * Criteria class for the {@link com.alphadevs.sales.domain.UOM} entity. This class is used
 * in {@link com.alphadevs.sales.web.rest.UOMResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /uoms?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class UOMCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter uomCode;

    private StringFilter uomDescription;

    private LongFilter historyId;

    public UOMCriteria(){
    }

    public UOMCriteria(UOMCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.uomCode = other.uomCode == null ? null : other.uomCode.copy();
        this.uomDescription = other.uomDescription == null ? null : other.uomDescription.copy();
        this.historyId = other.historyId == null ? null : other.historyId.copy();
    }

    @Override
    public UOMCriteria copy() {
        return new UOMCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getUomCode() {
        return uomCode;
    }

    public void setUomCode(StringFilter uomCode) {
        this.uomCode = uomCode;
    }

    public StringFilter getUomDescription() {
        return uomDescription;
    }

    public void setUomDescription(StringFilter uomDescription) {
        this.uomDescription = uomDescription;
    }

    public LongFilter getHistoryId() {
        return historyId;
    }

    public void setHistoryId(LongFilter historyId) {
        this.historyId = historyId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final UOMCriteria that = (UOMCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(uomCode, that.uomCode) &&
            Objects.equals(uomDescription, that.uomDescription) &&
            Objects.equals(historyId, that.historyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        uomCode,
        uomDescription,
        historyId
        );
    }

    @Override
    public String toString() {
        return "UOMCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (uomCode != null ? "uomCode=" + uomCode + ", " : "") +
                (uomDescription != null ? "uomDescription=" + uomDescription + ", " : "") +
                (historyId != null ? "historyId=" + historyId + ", " : "") +
            "}";
    }

}
