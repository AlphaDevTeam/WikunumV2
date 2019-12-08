import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISalesAccount } from 'app/shared/model/sales-account.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SalesAccountService } from './sales-account.service';
import { SalesAccountDeleteDialogComponent } from './sales-account-delete-dialog.component';

@Component({
  selector: 'jhi-sales-account',
  templateUrl: './sales-account.component.html'
})
export class SalesAccountComponent implements OnInit, OnDestroy {
  salesAccounts: ISalesAccount[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected salesAccountService: SalesAccountService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.salesAccounts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.salesAccountService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISalesAccount[]>) => this.paginateSalesAccounts(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.salesAccounts = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSalesAccounts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISalesAccount) {
    return item.id;
  }

  registerChangeInSalesAccounts() {
    this.eventSubscriber = this.eventManager.subscribe('salesAccountListModification', () => this.reset());
  }

  delete(salesAccount: ISalesAccount) {
    const modalRef = this.modalService.open(SalesAccountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.salesAccount = salesAccount;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSalesAccounts(data: ISalesAccount[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.salesAccounts.push(data[i]);
    }
  }
}
