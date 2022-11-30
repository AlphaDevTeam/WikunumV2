import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICashPaymentVoucherExpense } from 'app/shared/model/cash-payment-voucher-expense.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CashPaymentVoucherExpenseService } from './cash-payment-voucher-expense.service';
import { CashPaymentVoucherExpenseDeleteDialogComponent } from './cash-payment-voucher-expense-delete-dialog.component';

@Component({
  selector: 'jhi-cash-payment-voucher-expense',
  templateUrl: './cash-payment-voucher-expense.component.html'
})
export class CashPaymentVoucherExpenseComponent implements OnInit, OnDestroy {
  cashPaymentVoucherExpenses: ICashPaymentVoucherExpense[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected cashPaymentVoucherExpenseService: CashPaymentVoucherExpenseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cashPaymentVoucherExpenses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.cashPaymentVoucherExpenseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICashPaymentVoucherExpense[]>) => this.paginateCashPaymentVoucherExpenses(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.cashPaymentVoucherExpenses = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCashPaymentVoucherExpenses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICashPaymentVoucherExpense) {
    return item.id;
  }

  registerChangeInCashPaymentVoucherExpenses() {
    this.eventSubscriber = this.eventManager.subscribe('cashPaymentVoucherExpenseListModification', () => this.reset());
  }

  delete(cashPaymentVoucherExpense: ICashPaymentVoucherExpense) {
    const modalRef = this.modalService.open(CashPaymentVoucherExpenseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cashPaymentVoucherExpense = cashPaymentVoucherExpense;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCashPaymentVoucherExpenses(data: ICashPaymentVoucherExpense[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.cashPaymentVoucherExpenses.push(data[i]);
    }
  }
}
