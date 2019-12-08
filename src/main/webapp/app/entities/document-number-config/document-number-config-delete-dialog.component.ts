import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentNumberConfig } from 'app/shared/model/document-number-config.model';
import { DocumentNumberConfigService } from './document-number-config.service';

@Component({
  templateUrl: './document-number-config-delete-dialog.component.html'
})
export class DocumentNumberConfigDeleteDialogComponent {
  documentNumberConfig: IDocumentNumberConfig;

  constructor(
    protected documentNumberConfigService: DocumentNumberConfigService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.documentNumberConfigService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'documentNumberConfigListModification',
        content: 'Deleted an documentNumberConfig'
      });
      this.activeModal.dismiss(true);
    });
  }
}
