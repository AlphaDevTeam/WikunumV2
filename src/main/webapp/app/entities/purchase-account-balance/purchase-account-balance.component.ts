import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseAccountBalance } from 'app/shared/model/purchase-account-balance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PurchaseAccountBalanceService } from './purchase-account-balance.service';
import { PurchaseAccountBalanceDeleteDialogComponent } from './purchase-account-balance-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-account-balance',
  templateUrl: './purchase-account-balance.component.html'
})
export class PurchaseAccountBalanceComponent implements OnInit, OnDestroy {
  purchaseAccountBalances: IPurchaseAccountBalance[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected purchaseAccountBalanceService: PurchaseAccountBalanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.purchaseAccountBalances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.purchaseAccountBalanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPurchaseAccountBalance[]>) => this.paginatePurchaseAccountBalances(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.purchaseAccountBalances = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPurchaseAccountBalances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPurchaseAccountBalance) {
    return item.id;
  }

  registerChangeInPurchaseAccountBalances() {
    this.eventSubscriber = this.eventManager.subscribe('purchaseAccountBalanceListModification', () => this.reset());
  }

  delete(purchaseAccountBalance: IPurchaseAccountBalance) {
    const modalRef = this.modalService.open(PurchaseAccountBalanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseAccountBalance = purchaseAccountBalance;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePurchaseAccountBalances(data: IPurchaseAccountBalance[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.purchaseAccountBalances.push(data[i]);
    }
  }
}
