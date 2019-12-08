import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemAddOns } from 'app/shared/model/item-add-ons.model';
import { ItemAddOnsService } from './item-add-ons.service';

@Component({
  templateUrl: './item-add-ons-delete-dialog.component.html'
})
export class ItemAddOnsDeleteDialogComponent {
  itemAddOns: IItemAddOns;

  constructor(
    protected itemAddOnsService: ItemAddOnsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemAddOnsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'itemAddOnsListModification',
        content: 'Deleted an itemAddOns'
      });
      this.activeModal.dismiss(true);
    });
  }
}
