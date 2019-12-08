import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionType } from 'app/shared/model/transaction-type.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TransactionTypeService } from './transaction-type.service';
import { TransactionTypeDeleteDialogComponent } from './transaction-type-delete-dialog.component';

@Component({
  selector: 'jhi-transaction-type',
  templateUrl: './transaction-type.component.html'
})
export class TransactionTypeComponent implements OnInit, OnDestroy {
  transactionTypes: ITransactionType[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected transactionTypeService: TransactionTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.transactionTypes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.transactionTypeService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITransactionType[]>) => this.paginateTransactionTypes(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.transactionTypes = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTransactionTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITransactionType) {
    return item.id;
  }

  registerChangeInTransactionTypes() {
    this.eventSubscriber = this.eventManager.subscribe('transactionTypeListModification', () => this.reset());
  }

  delete(transactionType: ITransactionType) {
    const modalRef = this.modalService.open(TransactionTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transactionType = transactionType;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTransactionTypes(data: ITransactionType[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.transactionTypes.push(data[i]);
    }
  }
}
