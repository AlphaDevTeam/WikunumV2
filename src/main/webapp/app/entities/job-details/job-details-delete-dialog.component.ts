import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobDetails } from 'app/shared/model/job-details.model';
import { JobDetailsService } from './job-details.service';

@Component({
  templateUrl: './job-details-delete-dialog.component.html'
})
export class JobDetailsDeleteDialogComponent {
  jobDetails: IJobDetails;

  constructor(
    protected jobDetailsService: JobDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.jobDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'jobDetailsListModification',
        content: 'Deleted an jobDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}
