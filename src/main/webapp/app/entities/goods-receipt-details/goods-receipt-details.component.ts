import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGoodsReceiptDetails } from 'app/shared/model/goods-receipt-details.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { GoodsReceiptDetailsService } from './goods-receipt-details.service';
import { GoodsReceiptDetailsDeleteDialogComponent } from './goods-receipt-details-delete-dialog.component';

@Component({
  selector: 'jhi-goods-receipt-details',
  templateUrl: './goods-receipt-details.component.html'
})
export class GoodsReceiptDetailsComponent implements OnInit, OnDestroy {
  goodsReceiptDetails: IGoodsReceiptDetails[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected goodsReceiptDetailsService: GoodsReceiptDetailsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.goodsReceiptDetails = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.goodsReceiptDetailsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IGoodsReceiptDetails[]>) => this.paginateGoodsReceiptDetails(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.goodsReceiptDetails = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInGoodsReceiptDetails();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGoodsReceiptDetails) {
    return item.id;
  }

  registerChangeInGoodsReceiptDetails() {
    this.eventSubscriber = this.eventManager.subscribe('goodsReceiptDetailsListModification', () => this.reset());
  }

  delete(goodsReceiptDetails: IGoodsReceiptDetails) {
    const modalRef = this.modalService.open(GoodsReceiptDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.goodsReceiptDetails = goodsReceiptDetails;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateGoodsReceiptDetails(data: IGoodsReceiptDetails[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.goodsReceiptDetails.push(data[i]);
    }
  }
}
