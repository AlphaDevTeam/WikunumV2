import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpenseAccount } from 'app/shared/model/expense-account.model';

@Component({
  selector: 'jhi-expense-account-detail',
  templateUrl: './expense-account-detail.component.html'
})
export class ExpenseAccountDetailComponent implements OnInit {
  expenseAccount: IExpenseAccount;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expenseAccount }) => {
      this.expenseAccount = expenseAccount;
    });
  }

  previousState() {
    window.history.back();
  }
}
