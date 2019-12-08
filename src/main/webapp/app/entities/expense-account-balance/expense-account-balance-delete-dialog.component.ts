import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpenseAccountBalance } from 'app/shared/model/expense-account-balance.model';
import { ExpenseAccountBalanceService } from './expense-account-balance.service';

@Component({
  templateUrl: './expense-account-balance-delete-dialog.component.html'
})
export class ExpenseAccountBalanceDeleteDialogComponent {
  expenseAccountBalance: IExpenseAccountBalance;

  constructor(
    protected expenseAccountBalanceService: ExpenseAccountBalanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.expenseAccountBalanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'expenseAccountBalanceListModification',
        content: 'Deleted an expenseAccountBalance'
      });
      this.activeModal.dismiss(true);
    });
  }
}
