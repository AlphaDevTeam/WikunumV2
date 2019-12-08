import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICashReceiptVoucherSupplier } from 'app/shared/model/cash-receipt-voucher-supplier.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CashReceiptVoucherSupplierService } from './cash-receipt-voucher-supplier.service';
import { CashReceiptVoucherSupplierDeleteDialogComponent } from './cash-receipt-voucher-supplier-delete-dialog.component';

@Component({
  selector: 'jhi-cash-receipt-voucher-supplier',
  templateUrl: './cash-receipt-voucher-supplier.component.html'
})
export class CashReceiptVoucherSupplierComponent implements OnInit, OnDestroy {
  cashReceiptVoucherSuppliers: ICashReceiptVoucherSupplier[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected cashReceiptVoucherSupplierService: CashReceiptVoucherSupplierService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cashReceiptVoucherSuppliers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.cashReceiptVoucherSupplierService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICashReceiptVoucherSupplier[]>) => this.paginateCashReceiptVoucherSuppliers(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.cashReceiptVoucherSuppliers = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCashReceiptVoucherSuppliers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICashReceiptVoucherSupplier) {
    return item.id;
  }

  registerChangeInCashReceiptVoucherSuppliers() {
    this.eventSubscriber = this.eventManager.subscribe('cashReceiptVoucherSupplierListModification', () => this.reset());
  }

  delete(cashReceiptVoucherSupplier: ICashReceiptVoucherSupplier) {
    const modalRef = this.modalService.open(CashReceiptVoucherSupplierDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cashReceiptVoucherSupplier = cashReceiptVoucherSupplier;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCashReceiptVoucherSuppliers(data: ICashReceiptVoucherSupplier[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.cashReceiptVoucherSuppliers.push(data[i]);
    }
  }
}
