import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorker } from 'app/shared/model/worker.model';
import { WorkerService } from './worker.service';

@Component({
  templateUrl: './worker-delete-dialog.component.html'
})
export class WorkerDeleteDialogComponent {
  worker: IWorker;

  constructor(protected workerService: WorkerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.workerService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'workerListModification',
        content: 'Deleted an worker'
      });
      this.activeModal.dismiss(true);
    });
  }
}
