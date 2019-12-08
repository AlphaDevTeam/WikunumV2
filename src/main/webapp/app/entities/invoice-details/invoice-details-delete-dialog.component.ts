import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceDetails } from 'app/shared/model/invoice-details.model';
import { InvoiceDetailsService } from './invoice-details.service';

@Component({
  templateUrl: './invoice-details-delete-dialog.component.html'
})
export class InvoiceDetailsDeleteDialogComponent {
  invoiceDetails: IInvoiceDetails;

  constructor(
    protected invoiceDetailsService: InvoiceDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.invoiceDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'invoiceDetailsListModification',
        content: 'Deleted an invoiceDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}
