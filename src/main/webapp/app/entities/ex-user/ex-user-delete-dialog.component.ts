import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExUser } from 'app/shared/model/ex-user.model';
import { ExUserService } from './ex-user.service';

@Component({
  templateUrl: './ex-user-delete-dialog.component.html'
})
export class ExUserDeleteDialogComponent {
  exUser: IExUser;

  constructor(protected exUserService: ExUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.exUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'exUserListModification',
        content: 'Deleted an exUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}
