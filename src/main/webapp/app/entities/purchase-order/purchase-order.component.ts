import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderDeleteDialogComponent } from './purchase-order-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-order',
  templateUrl: './purchase-order.component.html'
})
export class PurchaseOrderComponent implements OnInit, OnDestroy {
  purchaseOrders: IPurchaseOrder[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected purchaseOrderService: PurchaseOrderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.purchaseOrders = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.purchaseOrderService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPurchaseOrder[]>) => this.paginatePurchaseOrders(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.purchaseOrders = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPurchaseOrders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPurchaseOrder) {
    return item.id;
  }

  registerChangeInPurchaseOrders() {
    this.eventSubscriber = this.eventManager.subscribe('purchaseOrderListModification', () => this.reset());
  }

  delete(purchaseOrder: IPurchaseOrder) {
    const modalRef = this.modalService.open(PurchaseOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseOrder = purchaseOrder;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePurchaseOrders(data: IPurchaseOrder[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.purchaseOrders.push(data[i]);
    }
  }
}
