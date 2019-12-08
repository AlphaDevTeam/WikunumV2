import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICashReceiptVoucherCustomer } from 'app/shared/model/cash-receipt-voucher-customer.model';
import { CashReceiptVoucherCustomerService } from './cash-receipt-voucher-customer.service';

@Component({
  templateUrl: './cash-receipt-voucher-customer-delete-dialog.component.html'
})
export class CashReceiptVoucherCustomerDeleteDialogComponent {
  cashReceiptVoucherCustomer: ICashReceiptVoucherCustomer;

  constructor(
    protected cashReceiptVoucherCustomerService: CashReceiptVoucherCustomerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cashReceiptVoucherCustomerService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'cashReceiptVoucherCustomerListModification',
        content: 'Deleted an cashReceiptVoucherCustomer'
      });
      this.activeModal.dismiss(true);
    });
  }
}
