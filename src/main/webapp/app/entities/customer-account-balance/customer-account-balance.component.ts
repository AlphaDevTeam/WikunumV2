import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerAccountBalance } from 'app/shared/model/customer-account-balance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CustomerAccountBalanceService } from './customer-account-balance.service';
import { CustomerAccountBalanceDeleteDialogComponent } from './customer-account-balance-delete-dialog.component';

@Component({
  selector: 'jhi-customer-account-balance',
  templateUrl: './customer-account-balance.component.html'
})
export class CustomerAccountBalanceComponent implements OnInit, OnDestroy {
  customerAccountBalances: ICustomerAccountBalance[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected customerAccountBalanceService: CustomerAccountBalanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.customerAccountBalances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.customerAccountBalanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICustomerAccountBalance[]>) => this.paginateCustomerAccountBalances(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.customerAccountBalances = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCustomerAccountBalances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomerAccountBalance) {
    return item.id;
  }

  registerChangeInCustomerAccountBalances() {
    this.eventSubscriber = this.eventManager.subscribe('customerAccountBalanceListModification', () => this.reset());
  }

  delete(customerAccountBalance: ICustomerAccountBalance) {
    const modalRef = this.modalService.open(CustomerAccountBalanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerAccountBalance = customerAccountBalance;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCustomerAccountBalances(data: ICustomerAccountBalance[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.customerAccountBalances.push(data[i]);
    }
  }
}
