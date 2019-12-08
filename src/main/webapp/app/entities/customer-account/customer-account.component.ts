import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerAccount } from 'app/shared/model/customer-account.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CustomerAccountService } from './customer-account.service';
import { CustomerAccountDeleteDialogComponent } from './customer-account-delete-dialog.component';

@Component({
  selector: 'jhi-customer-account',
  templateUrl: './customer-account.component.html'
})
export class CustomerAccountComponent implements OnInit, OnDestroy {
  customerAccounts: ICustomerAccount[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected customerAccountService: CustomerAccountService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.customerAccounts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.customerAccountService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICustomerAccount[]>) => this.paginateCustomerAccounts(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.customerAccounts = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCustomerAccounts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomerAccount) {
    return item.id;
  }

  registerChangeInCustomerAccounts() {
    this.eventSubscriber = this.eventManager.subscribe('customerAccountListModification', () => this.reset());
  }

  delete(customerAccount: ICustomerAccount) {
    const modalRef = this.modalService.open(CustomerAccountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerAccount = customerAccount;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCustomerAccounts(data: ICustomerAccount[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.customerAccounts.push(data[i]);
    }
  }
}
