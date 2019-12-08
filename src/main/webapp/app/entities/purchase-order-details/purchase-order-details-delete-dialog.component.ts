import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseOrderDetails } from 'app/shared/model/purchase-order-details.model';
import { PurchaseOrderDetailsService } from './purchase-order-details.service';

@Component({
  templateUrl: './purchase-order-details-delete-dialog.component.html'
})
export class PurchaseOrderDetailsDeleteDialogComponent {
  purchaseOrderDetails: IPurchaseOrderDetails;

  constructor(
    protected purchaseOrderDetailsService: PurchaseOrderDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.purchaseOrderDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'purchaseOrderDetailsListModification',
        content: 'Deleted an purchaseOrderDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}
