import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from './document-history.service';

@Component({
  templateUrl: './document-history-delete-dialog.component.html'
})
export class DocumentHistoryDeleteDialogComponent {
  documentHistory: IDocumentHistory;

  constructor(
    protected documentHistoryService: DocumentHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.documentHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'documentHistoryListModification',
        content: 'Deleted an documentHistory'
      });
      this.activeModal.dismiss(true);
    });
  }
}
