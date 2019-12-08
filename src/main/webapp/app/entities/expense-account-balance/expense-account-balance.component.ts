import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExpenseAccountBalance } from 'app/shared/model/expense-account-balance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ExpenseAccountBalanceService } from './expense-account-balance.service';
import { ExpenseAccountBalanceDeleteDialogComponent } from './expense-account-balance-delete-dialog.component';

@Component({
  selector: 'jhi-expense-account-balance',
  templateUrl: './expense-account-balance.component.html'
})
export class ExpenseAccountBalanceComponent implements OnInit, OnDestroy {
  expenseAccountBalances: IExpenseAccountBalance[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected expenseAccountBalanceService: ExpenseAccountBalanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.expenseAccountBalances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.expenseAccountBalanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IExpenseAccountBalance[]>) => this.paginateExpenseAccountBalances(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.expenseAccountBalances = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInExpenseAccountBalances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExpenseAccountBalance) {
    return item.id;
  }

  registerChangeInExpenseAccountBalances() {
    this.eventSubscriber = this.eventManager.subscribe('expenseAccountBalanceListModification', () => this.reset());
  }

  delete(expenseAccountBalance: IExpenseAccountBalance) {
    const modalRef = this.modalService.open(ExpenseAccountBalanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.expenseAccountBalance = expenseAccountBalance;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExpenseAccountBalances(data: IExpenseAccountBalance[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.expenseAccountBalances.push(data[i]);
    }
  }
}
