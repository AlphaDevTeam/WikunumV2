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
import io.github.jhipster.service.filter.BigDecimalFilter;

/**
 * Criteria class for the {@link com.alphadevs.sales.domain.Supplier} entity. This class is used
 * in {@link com.alphadevs.sales.web.rest.SupplierResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /suppliers?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class SupplierCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter supplierCode;

    private StringFilter supplierName;

    private BigDecimalFilter supplierCreditLimit;

    private BooleanFilter isActive;

    private DoubleFilter rating;

    private LongFilter locationId;

    private LongFilter historyId;

    public SupplierCriteria(){
    }

    public SupplierCriteria(SupplierCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.supplierCode = other.supplierCode == null ? null : other.supplierCode.copy();
        this.supplierName = other.supplierName == null ? null : other.supplierName.copy();
        this.supplierCreditLimit = other.supplierCreditLimit == null ? null : other.supplierCreditLimit.copy();
        this.isActive = other.isActive == null ? null : other.isActive.copy();
        this.rating = other.rating == null ? null : other.rating.copy();
        this.locationId = other.locationId == null ? null : other.locationId.copy();
        this.historyId = other.historyId == null ? null : other.historyId.copy();
    }

    @Override
    public SupplierCriteria copy() {
        return new SupplierCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(StringFilter supplierCode) {
        this.supplierCode = supplierCode;
    }

    public StringFilter getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(StringFilter supplierName) {
        this.supplierName = supplierName;
    }

    public BigDecimalFilter getSupplierCreditLimit() {
        return supplierCreditLimit;
    }

    public void setSupplierCreditLimit(BigDecimalFilter supplierCreditLimit) {
        this.supplierCreditLimit = supplierCreditLimit;
    }

    public BooleanFilter getIsActive() {
        return isActive;
    }

    public void setIsActive(BooleanFilter isActive) {
        this.isActive = isActive;
    }

    public DoubleFilter getRating() {
        return rating;
    }

    public void setRating(DoubleFilter rating) {
        this.rating = rating;
    }

    public LongFilter getLocationId() {
        return locationId;
    }

    public void setLocationId(LongFilter locationId) {
        this.locationId = locationId;
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
        final SupplierCriteria that = (SupplierCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(supplierCode, that.supplierCode) &&
            Objects.equals(supplierName, that.supplierName) &&
            Objects.equals(supplierCreditLimit, that.supplierCreditLimit) &&
            Objects.equals(isActive, that.isActive) &&
            Objects.equals(rating, that.rating) &&
            Objects.equals(locationId, that.locationId) &&
            Objects.equals(historyId, that.historyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        supplierCode,
        supplierName,
        supplierCreditLimit,
        isActive,
        rating,
        locationId,
        historyId
        );
    }

    @Override
    public String toString() {
        return "SupplierCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (supplierCode != null ? "supplierCode=" + supplierCode + ", " : "") +
                (supplierName != null ? "supplierName=" + supplierName + ", " : "") +
                (supplierCreditLimit != null ? "supplierCreditLimit=" + supplierCreditLimit + ", " : "") +
                (isActive != null ? "isActive=" + isActive + ", " : "") +
                (rating != null ? "rating=" + rating + ", " : "") +
                (locationId != null ? "locationId=" + locationId + ", " : "") +
                (historyId != null ? "historyId=" + historyId + ", " : "") +
            "}";
    }

}
