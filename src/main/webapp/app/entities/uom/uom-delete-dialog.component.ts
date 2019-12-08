import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUOM } from 'app/shared/model/uom.model';
import { UOMService } from './uom.service';

@Component({
  templateUrl: './uom-delete-dialog.component.html'
})
export class UOMDeleteDialogComponent {
  uOM: IUOM;

  constructor(protected uOMService: UOMService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.uOMService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'uOMListModification',
        content: 'Deleted an uOM'
      });
      this.activeModal.dismiss(true);
    });
  }
}
