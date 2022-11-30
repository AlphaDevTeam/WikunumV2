import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentHistory } from 'app/shared/model/document-history.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DocumentHistoryService } from './document-history.service';
import { DocumentHistoryDeleteDialogComponent } from './document-history-delete-dialog.component';

@Component({
  selector: 'jhi-document-history',
  templateUrl: './document-history.component.html'
})
export class DocumentHistoryComponent implements OnInit, OnDestroy {
  documentHistories: IDocumentHistory[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected documentHistoryService: DocumentHistoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.documentHistories = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.documentHistoryService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDocumentHistory[]>) => this.paginateDocumentHistories(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.documentHistories = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDocumentHistories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocumentHistory) {
    return item.id;
  }

  registerChangeInDocumentHistories() {
    this.eventSubscriber = this.eventManager.subscribe('documentHistoryListModification', () => this.reset());
  }

  delete(documentHistory: IDocumentHistory) {
    const modalRef = this.modalService.open(DocumentHistoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentHistory = documentHistory;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDocumentHistories(data: IDocumentHistory[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.documentHistories.push(data[i]);
    }
  }
}
