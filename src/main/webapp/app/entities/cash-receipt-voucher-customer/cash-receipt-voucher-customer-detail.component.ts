import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICashReceiptVoucherCustomer } from 'app/shared/model/cash-receipt-voucher-customer.model';

@Component({
  selector: 'jhi-cash-receipt-voucher-customer-detail',
  templateUrl: './cash-receipt-voucher-customer-detail.component.html'
})
export class CashReceiptVoucherCustomerDetailComponent implements OnInit {
  cashReceiptVoucherCustomer: ICashReceiptVoucherCustomer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cashReceiptVoucherCustomer }) => {
      this.cashReceiptVoucherCustomer = cashReceiptVoucherCustomer;
    });
  }

  previousState() {
    window.history.back();
  }
}
