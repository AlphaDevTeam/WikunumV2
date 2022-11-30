import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseAccountBalance } from 'app/shared/model/purchase-account-balance.model';
import { PurchaseAccountBalanceService } from './purchase-account-balance.service';

@Component({
  templateUrl: './purchase-account-balance-delete-dialog.component.html'
})
export class PurchaseAccountBalanceDeleteDialogComponent {
  purchaseAccountBalance: IPurchaseAccountBalance;

  constructor(
    protected purchaseAccountBalanceService: PurchaseAccountBalanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.purchaseAccountBalanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'purchaseAccountBalanceListModification',
        content: 'Deleted an purchaseAccountBalance'
      });
      this.activeModal.dismiss(true);
    });
  }
}
