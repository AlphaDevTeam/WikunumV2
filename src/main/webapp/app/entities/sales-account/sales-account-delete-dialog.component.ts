import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISalesAccount } from 'app/shared/model/sales-account.model';
import { SalesAccountService } from './sales-account.service';

@Component({
  templateUrl: './sales-account-delete-dialog.component.html'
})
export class SalesAccountDeleteDialogComponent {
  salesAccount: ISalesAccount;

  constructor(
    protected salesAccountService: SalesAccountService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.salesAccountService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'salesAccountListModification',
        content: 'Deleted an salesAccount'
      });
      this.activeModal.dismiss(true);
    });
  }
}
