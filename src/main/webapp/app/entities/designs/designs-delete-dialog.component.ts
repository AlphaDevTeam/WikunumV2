import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDesigns } from 'app/shared/model/designs.model';
import { DesignsService } from './designs.service';

@Component({
  templateUrl: './designs-delete-dialog.component.html'
})
export class DesignsDeleteDialogComponent {
  designs: IDesigns;

  constructor(protected designsService: DesignsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.designsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'designsListModification',
        content: 'Deleted an designs'
      });
      this.activeModal.dismiss(true);
    });
  }
}
