import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseAccount } from 'app/shared/model/purchase-account.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PurchaseAccountService } from './purchase-account.service';
import { PurchaseAccountDeleteDialogComponent } from './purchase-account-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-account',
  templateUrl: './purchase-account.component.html'
})
export class PurchaseAccountComponent implements OnInit, OnDestroy {
  purchaseAccounts: IPurchaseAccount[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected purchaseAccountService: PurchaseAccountService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.purchaseAccounts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.purchaseAccountService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPurchaseAccount[]>) => this.paginatePurchaseAccounts(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.purchaseAccounts = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPurchaseAccounts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPurchaseAccount) {
    return item.id;
  }

  registerChangeInPurchaseAccounts() {
    this.eventSubscriber = this.eventManager.subscribe('purchaseAccountListModification', () => this.reset());
  }

  delete(purchaseAccount: IPurchaseAccount) {
    const modalRef = this.modalService.open(PurchaseAccountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseAccount = purchaseAccount;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePurchaseAccounts(data: IPurchaseAccount[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.purchaseAccounts.push(data[i]);
    }
  }
}
