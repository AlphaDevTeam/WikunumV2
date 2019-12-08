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
 * Criteria class for the {@link com.alphadevs.sales.domain.Invoice} entity. This class is used
 * in {@link com.alphadevs.sales.web.rest.InvoiceResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /invoices?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InvoiceCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter invNumber;

    private LocalDateFilter invDate;

    private LongFilter detailsId;

    private LongFilter itemId;

    private LongFilter locationId;

    private LongFilter historyId;

    public InvoiceCriteria(){
    }

    public InvoiceCriteria(InvoiceCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.invNumber = other.invNumber == null ? null : other.invNumber.copy();
        this.invDate = other.invDate == null ? null : other.invDate.copy();
        this.detailsId = other.detailsId == null ? null : other.detailsId.copy();
        this.itemId = other.itemId == null ? null : other.itemId.copy();
        this.locationId = other.locationId == null ? null : other.locationId.copy();
        this.historyId = other.historyId == null ? null : other.historyId.copy();
    }

    @Override
    public InvoiceCriteria copy() {
        return new InvoiceCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getInvNumber() {
        return invNumber;
    }

    public void setInvNumber(StringFilter invNumber) {
        this.invNumber = invNumber;
    }

    public LocalDateFilter getInvDate() {
        return invDate;
    }

    public void setInvDate(LocalDateFilter invDate) {
        this.invDate = invDate;
    }

    public LongFilter getDetailsId() {
        return detailsId;
    }

    public void setDetailsId(LongFilter detailsId) {
        this.detailsId = detailsId;
    }

    public LongFilter getItemId() {
        return itemId;
    }

    public void setItemId(LongFilter itemId) {
        this.itemId = itemId;
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
        final InvoiceCriteria that = (InvoiceCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(invNumber, that.invNumber) &&
            Objects.equals(invDate, that.invDate) &&
            Objects.equals(detailsId, that.detailsId) &&
            Objects.equals(itemId, that.itemId) &&
            Objects.equals(locationId, that.locationId) &&
            Objects.equals(historyId, that.historyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        invNumber,
        invDate,
        detailsId,
        itemId,
        locationId,
        historyId
        );
    }

    @Override
    public String toString() {
        return "InvoiceCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (invNumber != null ? "invNumber=" + invNumber + ", " : "") +
                (invDate != null ? "invDate=" + invDate + ", " : "") +
                (detailsId != null ? "detailsId=" + detailsId + ", " : "") +
                (itemId != null ? "itemId=" + itemId + ", " : "") +
                (locationId != null ? "locationId=" + locationId + ", " : "") +
                (historyId != null ? "historyId=" + historyId + ", " : "") +
            "}";
    }

}
