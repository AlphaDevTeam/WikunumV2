import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICashPaymentVoucherCustomer } from 'app/shared/model/cash-payment-voucher-customer.model';
import { CashPaymentVoucherCustomerService } from './cash-payment-voucher-customer.service';

@Component({
  templateUrl: './cash-payment-voucher-customer-delete-dialog.component.html'
})
export class CashPaymentVoucherCustomerDeleteDialogComponent {
  cashPaymentVoucherCustomer: ICashPaymentVoucherCustomer;

  constructor(
    protected cashPaymentVoucherCustomerService: CashPaymentVoucherCustomerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cashPaymentVoucherCustomerService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'cashPaymentVoucherCustomerListModification',
        content: 'Deleted an cashPaymentVoucherCustomer'
      });
      this.activeModal.dismiss(true);
    });
  }
}