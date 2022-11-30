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
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link com.alphadevs.sales.domain.CashReceiptVoucherCustomer} entity. This class is used
 * in {@link com.alphadevs.sales.web.rest.CashReceiptVoucherCustomerResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /cash-receipt-voucher-customers?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CashReceiptVoucherCustomerCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LocalDateFilter transactionDate;

    private StringFilter transactionDescription;

    private BigDecimalFilter transactionAmount;

    private LongFilter locationId;

    private LongFilter transactionTypeId;

    private LongFilter customerId;

    private LongFilter historyId;

    public CashReceiptVoucherCustomerCriteria(){
    }

    public CashReceiptVoucherCustomerCriteria(CashReceiptVoucherCustomerCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.transactionDate = other.transactionDate == null ? null : other.transactionDate.copy();
        this.transactionDescription = other.transactionDescription == null ? null : other.transactionDescription.copy();
        this.transactionAmount = other.transactionAmount == null ? null : other.transactionAmount.copy();
        this.locationId = other.locationId == null ? null : other.locationId.copy();
        this.transactionTypeId = other.transactionTypeId == null ? null : other.transactionTypeId.copy();
        this.customerId = other.customerId == null ? null : other.customerId.copy();
        this.historyId = other.historyId == null ? null : other.historyId.copy();
    }

    @Override
    public CashReceiptVoucherCustomerCriteria copy() {
        return new CashReceiptVoucherCustomerCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateFilter transactionDate) {
        this.transactionDate = transactionDate;
    }

    public StringFilter getTransactionDescription() {
        return transactionDescription;
    }

    public void setTransactionDescription(StringFilter transactionDescription) {
        this.transactionDescription = transactionDescription;
    }

    public BigDecimalFilter getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(BigDecimalFilter transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public LongFilter getLocationId() {
        return locationId;
    }

    public void setLocationId(LongFilter locationId) {
        this.locationId = locationId;
    }

    public LongFilter getTransactionTypeId() {
        return transactionTypeId;
    }

    public void setTransactionTypeId(LongFilter transactionTypeId) {
        this.transactionTypeId = transactionTypeId;
    }

    public LongFilter getCustomerId() {
        return customerId;
    }

    public void setCustomerId(LongFilter customerId) {
        this.customerId = customerId;
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
        final CashReceiptVoucherCustomerCriteria that = (CashReceiptVoucherCustomerCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(transactionDate, that.transactionDate) &&
            Objects.equals(transactionDescription, that.transactionDescription) &&
            Objects.equals(transactionAmount, that.transactionAmount) &&
            Objects.equals(locationId, that.locationId) &&
            Objects.equals(transactionTypeId, that.transactionTypeId) &&
            Objects.equals(customerId, that.customerId) &&
            Objects.equals(historyId, that.historyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        transactionDate,
        transactionDescription,
        transactionAmount,
        locationId,
        transactionTypeId,
        customerId,
        historyId
        );
    }

    @Override
    public String toString() {
        return "CashReceiptVoucherCustomerCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (transactionDate != null ? "transactionDate=" + transactionDate + ", " : "") +
                (transactionDescription != null ? "transactionDescription=" + transactionDescription + ", " : "") +
                (transactionAmount != null ? "transactionAmount=" + transactionAmount + ", " : "") +
                (locationId != null ? "locationId=" + locationId + ", " : "") +
                (transactionTypeId != null ? "transactionTypeId=" + transactionTypeId + ", " : "") +
                (customerId != null ? "customerId=" + customerId + ", " : "") +
                (historyId != null ? "historyId=" + historyId + ", " : "") +
            "}";
    }

}
