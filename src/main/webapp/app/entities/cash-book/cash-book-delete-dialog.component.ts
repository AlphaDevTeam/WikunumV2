import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICashBook } from 'app/shared/model/cash-book.model';
import { CashBookService } from './cash-book.service';

@Component({
  templateUrl: './cash-book-delete-dialog.component.html'
})
export class CashBookDeleteDialogComponent {
  cashBook: ICashBook;

  constructor(protected cashBookService: CashBookService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cashBookService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'cashBookListModification',
        content: 'Deleted an cashBook'
      });
      this.activeModal.dismiss(true);
    });
  }
}
