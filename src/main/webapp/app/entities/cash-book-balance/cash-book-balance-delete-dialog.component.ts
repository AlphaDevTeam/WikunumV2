import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICashBookBalance } from 'app/shared/model/cash-book-balance.model';
import { CashBookBalanceService } from './cash-book-balance.service';

@Component({
  templateUrl: './cash-book-balance-delete-dialog.component.html'
})
export class CashBookBalanceDeleteDialogComponent {
  cashBookBalance: ICashBookBalance;

  constructor(
    protected cashBookBalanceService: CashBookBalanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cashBookBalanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'cashBookBalanceListModification',
        content: 'Deleted an cashBookBalance'
      });
      this.activeModal.dismiss(true);
    });
  }
}
