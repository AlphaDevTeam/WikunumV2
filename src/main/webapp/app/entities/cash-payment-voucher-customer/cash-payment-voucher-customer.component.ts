import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICashPaymentVoucherCustomer } from 'app/shared/model/cash-payment-voucher-customer.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CashPaymentVoucherCustomerService } from './cash-payment-voucher-customer.service';
import { CashPaymentVoucherCustomerDeleteDialogComponent } from './cash-payment-voucher-customer-delete-dialog.component';

@Component({
  selector: 'jhi-cash-payment-voucher-customer',
  templateUrl: './cash-payment-voucher-customer.component.html'
})
export class CashPaymentVoucherCustomerComponent implements OnInit, OnDestroy {
  cashPaymentVoucherCustomers: ICashPaymentVoucherCustomer[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected cashPaymentVoucherCustomerService: CashPaymentVoucherCustomerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cashPaymentVoucherCustomers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.cashPaymentVoucherCustomerService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICashPaymentVoucherCustomer[]>) => this.paginateCashPaymentVoucherCustomers(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.cashPaymentVoucherCustomers = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCashPaymentVoucherCustomers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICashPaymentVoucherCustomer) {
    return item.id;
  }

  registerChangeInCashPaymentVoucherCustomers() {
    this.eventSubscriber = this.eventManager.subscribe('cashPaymentVoucherCustomerListModification', () => this.reset());
  }

  delete(cashPaymentVoucherCustomer: ICashPaymentVoucherCustomer) {
    const modalRef = this.modalService.open(CashPaymentVoucherCustomerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cashPaymentVoucherCustomer = cashPaymentVoucherCustomer;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCashPaymentVoucherCustomers(data: ICashPaymentVoucherCustomer[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.cashPaymentVoucherCustomers.push(data[i]);
    }
  }
}
