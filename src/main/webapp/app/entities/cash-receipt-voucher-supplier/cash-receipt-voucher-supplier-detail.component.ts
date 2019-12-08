import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICashReceiptVoucherSupplier } from 'app/shared/model/cash-receipt-voucher-supplier.model';

@Component({
  selector: 'jhi-cash-receipt-voucher-supplier-detail',
  templateUrl: './cash-receipt-voucher-supplier-detail.component.html'
})
export class CashReceiptVoucherSupplierDetailComponent implements OnInit {
  cashReceiptVoucherSupplier: ICashReceiptVoucherSupplier;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cashReceiptVoucherSupplier }) => {
      this.cashReceiptVoucherSupplier = cashReceiptVoucherSupplier;
    });
  }

  previousState() {
    window.history.back();
  }
}
