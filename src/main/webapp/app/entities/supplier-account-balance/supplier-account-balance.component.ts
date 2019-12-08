import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplierAccountBalance } from 'app/shared/model/supplier-account-balance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SupplierAccountBalanceService } from './supplier-account-balance.service';
import { SupplierAccountBalanceDeleteDialogComponent } from './supplier-account-balance-delete-dialog.component';

@Component({
  selector: 'jhi-supplier-account-balance',
  templateUrl: './supplier-account-balance.component.html'
})
export class SupplierAccountBalanceComponent implements OnInit, OnDestroy {
  supplierAccountBalances: ISupplierAccountBalance[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected supplierAccountBalanceService: SupplierAccountBalanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.supplierAccountBalances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.supplierAccountBalanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISupplierAccountBalance[]>) => this.paginateSupplierAccountBalances(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.supplierAccountBalances = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSupplierAccountBalances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISupplierAccountBalance) {
    return item.id;
  }

  registerChangeInSupplierAccountBalances() {
    this.eventSubscriber = this.eventManager.subscribe('supplierAccountBalanceListModification', () => this.reset());
  }

  delete(supplierAccountBalance: ISupplierAccountBalance) {
    const modalRef = this.modalService.open(SupplierAccountBalanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supplierAccountBalance = supplierAccountBalance;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSupplierAccountBalances(data: ISupplierAccountBalance[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.supplierAccountBalances.push(data[i]);
    }
  }
}
