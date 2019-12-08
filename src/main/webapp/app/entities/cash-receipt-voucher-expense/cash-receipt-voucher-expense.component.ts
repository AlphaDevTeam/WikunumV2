import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICashReceiptVoucherExpense } from 'app/shared/model/cash-receipt-voucher-expense.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CashReceiptVoucherExpenseService } from './cash-receipt-voucher-expense.service';
import { CashReceiptVoucherExpenseDeleteDialogComponent } from './cash-receipt-voucher-expense-delete-dialog.component';

@Component({
  selector: 'jhi-cash-receipt-voucher-expense',
  templateUrl: './cash-receipt-voucher-expense.component.html'
})
export class CashReceiptVoucherExpenseComponent implements OnInit, OnDestroy {
  cashReceiptVoucherExpenses: ICashReceiptVoucherExpense[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected cashReceiptVoucherExpenseService: CashReceiptVoucherExpenseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cashReceiptVoucherExpenses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.cashReceiptVoucherExpenseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICashReceiptVoucherExpense[]>) => this.paginateCashReceiptVoucherExpenses(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.cashReceiptVoucherExpenses = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCashReceiptVoucherExpenses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICashReceiptVoucherExpense) {
    return item.id;
  }

  registerChangeInCashReceiptVoucherExpenses() {
    this.eventSubscriber = this.eventManager.subscribe('cashReceiptVoucherExpenseListModification', () => this.reset());
  }

  delete(cashReceiptVoucherExpense: ICashReceiptVoucherExpense) {
    const modalRef = this.modalService.open(CashReceiptVoucherExpenseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cashReceiptVoucherExpense = cashReceiptVoucherExpense;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCashReceiptVoucherExpenses(data: ICashReceiptVoucherExpense[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.cashReceiptVoucherExpenses.push(data[i]);
    }
  }
}
