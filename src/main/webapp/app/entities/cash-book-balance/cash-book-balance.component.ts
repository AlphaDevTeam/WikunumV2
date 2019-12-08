import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICashBookBalance } from 'app/shared/model/cash-book-balance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CashBookBalanceService } from './cash-book-balance.service';
import { CashBookBalanceDeleteDialogComponent } from './cash-book-balance-delete-dialog.component';

@Component({
  selector: 'jhi-cash-book-balance',
  templateUrl: './cash-book-balance.component.html'
})
export class CashBookBalanceComponent implements OnInit, OnDestroy {
  cashBookBalances: ICashBookBalance[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected cashBookBalanceService: CashBookBalanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cashBookBalances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.cashBookBalanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICashBookBalance[]>) => this.paginateCashBookBalances(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.cashBookBalances = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCashBookBalances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICashBookBalance) {
    return item.id;
  }

  registerChangeInCashBookBalances() {
    this.eventSubscriber = this.eventManager.subscribe('cashBookBalanceListModification', () => this.reset());
  }

  delete(cashBookBalance: ICashBookBalance) {
    const modalRef = this.modalService.open(CashBookBalanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cashBookBalance = cashBookBalance;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCashBookBalances(data: ICashBookBalance[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.cashBookBalances.push(data[i]);
    }
  }
}
