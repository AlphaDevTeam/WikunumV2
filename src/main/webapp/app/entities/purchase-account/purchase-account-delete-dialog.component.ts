import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseAccount } from 'app/shared/model/purchase-account.model';
import { PurchaseAccountService } from './purchase-account.service';

@Component({
  templateUrl: './purchase-account-delete-dialog.component.html'
})
export class PurchaseAccountDeleteDialogComponent {
  purchaseAccount: IPurchaseAccount;

  constructor(
    protected purchaseAccountService: PurchaseAccountService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.purchaseAccountService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'purchaseAccountListModification',
        content: 'Deleted an purchaseAccount'
      });
      this.activeModal.dismiss(true);
    });
  }
}
