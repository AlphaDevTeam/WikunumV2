import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupplierAccountBalance } from 'app/shared/model/supplier-account-balance.model';
import { SupplierAccountBalanceService } from './supplier-account-balance.service';

@Component({
  templateUrl: './supplier-account-balance-delete-dialog.component.html'
})
export class SupplierAccountBalanceDeleteDialogComponent {
  supplierAccountBalance: ISupplierAccountBalance;

  constructor(
    protected supplierAccountBalanceService: SupplierAccountBalanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.supplierAccountBalanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'supplierAccountBalanceListModification',
        content: 'Deleted an supplierAccountBalance'
      });
      this.activeModal.dismiss(true);
    });
  }
}
