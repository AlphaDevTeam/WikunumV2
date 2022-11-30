import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItems } from 'app/shared/model/items.model';
import { ItemsService } from './items.service';

@Component({
  templateUrl: './items-delete-dialog.component.html'
})
export class ItemsDeleteDialogComponent {
  items: IItems;

  constructor(protected itemsService: ItemsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'itemsListModification',
        content: 'Deleted an items'
      });
      this.activeModal.dismiss(true);
    });
  }
}
