import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpenseAccountBalance } from 'app/shared/model/expense-account-balance.model';

@Component({
  selector: 'jhi-expense-account-balance-detail',
  templateUrl: './expense-account-balance-detail.component.html'
})
export class ExpenseAccountBalanceDetailComponent implements OnInit {
  expenseAccountBalance: IExpenseAccountBalance;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expenseAccountBalance }) => {
      this.expenseAccountBalance = expenseAccountBalance;
    });
  }

  previousState() {
    window.history.back();
  }
}
