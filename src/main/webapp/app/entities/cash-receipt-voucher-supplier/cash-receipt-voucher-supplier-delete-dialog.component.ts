import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICashReceiptVoucherSupplier } from 'app/shared/model/cash-receipt-voucher-supplier.model';
import { CashReceiptVoucherSupplierService } from './cash-receipt-voucher-supplier.service';

@Component({
  templateUrl: './cash-receipt-voucher-supplier-delete-dialog.component.html'
})
export class CashReceiptVoucherSupplierDeleteDialogComponent {
  cashReceiptVoucherSupplier: ICashReceiptVoucherSupplier;

  constructor(
    protected cashReceiptVoucherSupplierService: CashReceiptVoucherSupplierService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cashReceiptVoucherSupplierService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'cashReceiptVoucherSupplierListModification',
        content: 'Deleted an cashReceiptVoucherSupplier'
      });
      this.activeModal.dismiss(true);
    });
  }
}
