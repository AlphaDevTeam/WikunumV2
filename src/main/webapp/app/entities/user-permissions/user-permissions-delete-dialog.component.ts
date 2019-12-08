import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserPermissions } from 'app/shared/model/user-permissions.model';
import { UserPermissionsService } from './user-permissions.service';

@Component({
  templateUrl: './user-permissions-delete-dialog.component.html'
})
export class UserPermissionsDeleteDialogComponent {
  userPermissions: IUserPermissions;

  constructor(
    protected userPermissionsService: UserPermissionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userPermissionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'userPermissionsListModification',
        content: 'Deleted an userPermissions'
      });
      this.activeModal.dismiss(true);
    });
  }
}
