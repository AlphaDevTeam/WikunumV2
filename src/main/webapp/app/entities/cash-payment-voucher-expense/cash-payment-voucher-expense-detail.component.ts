import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICashPaymentVoucherExpense } from 'app/shared/model/cash-payment-voucher-expense.model';

@Component({
  selector: 'jhi-cash-payment-voucher-expense-detail',
  templateUrl: './cash-payment-voucher-expense-detail.component.html'
})
export class CashPaymentVoucherExpenseDetailComponent implements OnInit {
  cashPaymentVoucherExpense: ICashPaymentVoucherExpense;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cashPaymentVoucherExpense }) => {
      this.cashPaymentVoucherExpense = cashPaymentVoucherExpense;
    });
  }

  previousState() {
    window.history.back();
  }
}
