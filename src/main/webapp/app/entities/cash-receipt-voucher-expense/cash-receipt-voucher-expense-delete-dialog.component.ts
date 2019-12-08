import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICashReceiptVoucherExpense } from 'app/shared/model/cash-receipt-voucher-expense.model';
import { CashReceiptVoucherExpenseService } from './cash-receipt-voucher-expense.service';

@Component({
  templateUrl: './cash-receipt-voucher-expense-delete-dialog.component.html'
})
export class CashReceiptVoucherExpenseDeleteDialogComponent {
  cashReceiptVoucherExpense: ICashReceiptVoucherExpense;

  constructor(
    protected cashReceiptVoucherExpenseService: CashReceiptVoucherExpenseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cashReceiptVoucherExpenseService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'cashReceiptVoucherExpenseListModification',
        content: 'Deleted an cashReceiptVoucherExpense'
      });
      this.activeModal.dismiss(true);
    });
  }
}
