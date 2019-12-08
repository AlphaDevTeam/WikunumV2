import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICashReceiptVoucherCustomer } from 'app/shared/model/cash-receipt-voucher-customer.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CashReceiptVoucherCustomerService } from './cash-receipt-voucher-customer.service';
import { CashReceiptVoucherCustomerDeleteDialogComponent } from './cash-receipt-voucher-customer-delete-dialog.component';

@Component({
  selector: 'jhi-cash-receipt-voucher-customer',
  templateUrl: './cash-receipt-voucher-customer.component.html'
})
export class CashReceiptVoucherCustomerComponent implements OnInit, OnDestroy {
  cashReceiptVoucherCustomers: ICashReceiptVoucherCustomer[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected cashReceiptVoucherCustomerService: CashReceiptVoucherCustomerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cashReceiptVoucherCustomers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.cashReceiptVoucherCustomerService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICashReceiptVoucherCustomer[]>) => this.paginateCashReceiptVoucherCustomers(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.cashReceiptVoucherCustomers = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCashReceiptVoucherCustomers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICashReceiptVoucherCustomer) {
    return item.id;
  }

  registerChangeInCashReceiptVoucherCustomers() {
    this.eventSubscriber = this.eventManager.subscribe('cashReceiptVoucherCustomerListModification', () => this.reset());
  }

  delete(cashReceiptVoucherCustomer: ICashReceiptVoucherCustomer) {
    const modalRef = this.modalService.open(CashReceiptVoucherCustomerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cashReceiptVoucherCustomer = cashReceiptVoucherCustomer;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCashReceiptVoucherCustomers(data: ICashReceiptVoucherCustomer[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.cashReceiptVoucherCustomers.push(data[i]);
    }
  }
}
