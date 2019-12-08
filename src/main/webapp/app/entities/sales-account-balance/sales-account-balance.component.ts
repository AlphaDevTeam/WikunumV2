import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISalesAccountBalance } from 'app/shared/model/sales-account-balance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SalesAccountBalanceService } from './sales-account-balance.service';
import { SalesAccountBalanceDeleteDialogComponent } from './sales-account-balance-delete-dialog.component';

@Component({
  selector: 'jhi-sales-account-balance',
  templateUrl: './sales-account-balance.component.html'
})
export class SalesAccountBalanceComponent implements OnInit, OnDestroy {
  salesAccountBalances: ISalesAccountBalance[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected salesAccountBalanceService: SalesAccountBalanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.salesAccountBalances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.salesAccountBalanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISalesAccountBalance[]>) => this.paginateSalesAccountBalances(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.salesAccountBalances = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSalesAccountBalances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISalesAccountBalance) {
    return item.id;
  }

  registerChangeInSalesAccountBalances() {
    this.eventSubscriber = this.eventManager.subscribe('salesAccountBalanceListModification', () => this.reset());
  }

  delete(salesAccountBalance: ISalesAccountBalance) {
    const modalRef = this.modalService.open(SalesAccountBalanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.salesAccountBalance = salesAccountBalance;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSalesAccountBalances(data: ISalesAccountBalance[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.salesAccountBalances.push(data[i]);
    }
  }
}
