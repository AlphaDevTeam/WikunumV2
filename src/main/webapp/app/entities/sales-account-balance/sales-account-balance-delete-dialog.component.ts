import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISalesAccountBalance } from 'app/shared/model/sales-account-balance.model';
import { SalesAccountBalanceService } from './sales-account-balance.service';

@Component({
  templateUrl: './sales-account-balance-delete-dialog.component.html'
})
export class SalesAccountBalanceDeleteDialogComponent {
  salesAccountBalance: ISalesAccountBalance;

  constructor(
    protected salesAccountBalanceService: SalesAccountBalanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.salesAccountBalanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'salesAccountBalanceListModification',
        content: 'Deleted an salesAccountBalance'
      });
      this.activeModal.dismiss(true);
    });
  }
}