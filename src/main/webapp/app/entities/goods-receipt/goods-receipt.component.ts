import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGoodsReceipt } from 'app/shared/model/goods-receipt.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { GoodsReceiptService } from './goods-receipt.service';
import { GoodsReceiptDeleteDialogComponent } from './goods-receipt-delete-dialog.component';

@Component({
  selector: 'jhi-goods-receipt',
  templateUrl: './goods-receipt.component.html'
})
export class GoodsReceiptComponent implements OnInit, OnDestroy {
  goodsReceipts: IGoodsReceipt[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected goodsReceiptService: GoodsReceiptService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.goodsReceipts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.goodsReceiptService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IGoodsReceipt[]>) => this.paginateGoodsReceipts(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.goodsReceipts = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInGoodsReceipts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGoodsReceipt) {
    return item.id;
  }

  registerChangeInGoodsReceipts() {
    this.eventSubscriber = this.eventManager.subscribe('goodsReceiptListModification', () => this.reset());
  }

  delete(goodsReceipt: IGoodsReceipt) {
    const modalRef = this.modalService.open(GoodsReceiptDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.goodsReceipt = goodsReceipt;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateGoodsReceipts(data: IGoodsReceipt[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.goodsReceipts.push(data[i]);
    }
  }
}
