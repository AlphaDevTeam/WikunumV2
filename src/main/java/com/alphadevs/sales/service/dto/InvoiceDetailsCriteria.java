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
 * Criteria class for the {@link com.alphadevs.sales.domain.InvoiceDetails} entity. This class is used
 * in {@link com.alphadevs.sales.web.rest.InvoiceDetailsResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /invoice-details?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InvoiceDetailsCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter invQty;

    private BigDecimalFilter revisedItemSalesPrice;

    private LongFilter invId;

    public InvoiceDetailsCriteria(){
    }

    public InvoiceDetailsCriteria(InvoiceDetailsCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.invQty = other.invQty == null ? null : other.invQty.copy();
        this.revisedItemSalesPrice = other.revisedItemSalesPrice == null ? null : other.revisedItemSalesPrice.copy();
        this.invId = other.invId == null ? null : other.invId.copy();
    }

    @Override
    public InvoiceDetailsCriteria copy() {
        return new InvoiceDetailsCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getInvQty() {
        return invQty;
    }

    public void setInvQty(StringFilter invQty) {
        this.invQty = invQty;
    }

    public BigDecimalFilter getRevisedItemSalesPrice() {
        return revisedItemSalesPrice;
    }

    public void setRevisedItemSalesPrice(BigDecimalFilter revisedItemSalesPrice) {
        this.revisedItemSalesPrice = revisedItemSalesPrice;
    }

    public LongFilter getInvId() {
        return invId;
    }

    public void setInvId(LongFilter invId) {
        this.invId = invId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InvoiceDetailsCriteria that = (InvoiceDetailsCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(invQty, that.invQty) &&
            Objects.equals(revisedItemSalesPrice, that.revisedItemSalesPrice) &&
            Objects.equals(invId, that.invId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        invQty,
        revisedItemSalesPrice,
        invId
        );
    }

    @Override
    public String toString() {
        return "InvoiceDetailsCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (invQty != null ? "invQty=" + invQty + ", " : "") +
                (revisedItemSalesPrice != null ? "revisedItemSalesPrice=" + revisedItemSalesPrice + ", " : "") +
                (invId != null ? "invId=" + invId + ", " : "") +
            "}";
    }

}
