import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICashBook } from 'app/shared/model/cash-book.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CashBookService } from './cash-book.service';
import { CashBookDeleteDialogComponent } from './cash-book-delete-dialog.component';

@Component({
  selector: 'jhi-cash-book',
  templateUrl: './cash-book.component.html'
})
export class CashBookComponent implements OnInit, OnDestroy {
  cashBooks: ICashBook[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected cashBookService: CashBookService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cashBooks = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.cashBookService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICashBook[]>) => this.paginateCashBooks(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.cashBooks = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCashBooks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICashBook) {
    return item.id;
  }

  registerChangeInCashBooks() {
    this.eventSubscriber = this.eventManager.subscribe('cashBookListModification', () => this.reset());
  }

  delete(cashBook: ICashBook) {
    const modalRef = this.modalService.open(CashBookDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cashBook = cashBook;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCashBooks(data: ICashBook[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.cashBooks.push(data[i]);
    }
  }
}
