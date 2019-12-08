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
 * Criteria class for the {@link com.alphadevs.sales.domain.Customer} entity. This class is used
 * in {@link com.alphadevs.sales.web.rest.CustomerResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /customers?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CustomerCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter customerCode;

    private StringFilter customerName;

    private BigDecimalFilter customerCreditLimit;

    private BooleanFilter isActive;

    private DoubleFilter rating;

    private LongFilter locationId;

    private LongFilter historyId;

    public CustomerCriteria(){
    }

    public CustomerCriteria(CustomerCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.customerCode = other.customerCode == null ? null : other.customerCode.copy();
        this.customerName = other.customerName == null ? null : other.customerName.copy();
        this.customerCreditLimit = other.customerCreditLimit == null ? null : other.customerCreditLimit.copy();
        this.isActive = other.isActive == null ? null : other.isActive.copy();
        this.rating = other.rating == null ? null : other.rating.copy();
        this.locationId = other.locationId == null ? null : other.locationId.copy();
        this.historyId = other.historyId == null ? null : other.historyId.copy();
    }

    @Override
    public CustomerCriteria copy() {
        return new CustomerCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(StringFilter customerCode) {
        this.customerCode = customerCode;
    }

    public StringFilter getCustomerName() {
        return customerName;
    }

    public void setCustomerName(StringFilter customerName) {
        this.customerName = customerName;
    }

    public BigDecimalFilter getCustomerCreditLimit() {
        return customerCreditLimit;
    }

    public void setCustomerCreditLimit(BigDecimalFilter customerCreditLimit) {
        this.customerCreditLimit = customerCreditLimit;
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
        final CustomerCriteria that = (CustomerCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(customerCode, that.customerCode) &&
            Objects.equals(customerName, that.customerName) &&
            Objects.equals(customerCreditLimit, that.customerCreditLimit) &&
            Objects.equals(isActive, that.isActive) &&
            Objects.equals(rating, that.rating) &&
            Objects.equals(locationId, that.locationId) &&
            Objects.equals(historyId, that.historyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        customerCode,
        customerName,
        customerCreditLimit,
        isActive,
        rating,
        locationId,
        historyId
        );
    }

    @Override
    public String toString() {
        return "CustomerCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (customerCode != null ? "customerCode=" + customerCode + ", " : "") +
                (customerName != null ? "customerName=" + customerName + ", " : "") +
                (customerCreditLimit != null ? "customerCreditLimit=" + customerCreditLimit + ", " : "") +
                (isActive != null ? "isActive=" + isActive + ", " : "") +
                (rating != null ? "rating=" + rating + ", " : "") +
                (locationId != null ? "locationId=" + locationId + ", " : "") +
                (historyId != null ? "historyId=" + historyId + ", " : "") +
            "}";
    }

}
