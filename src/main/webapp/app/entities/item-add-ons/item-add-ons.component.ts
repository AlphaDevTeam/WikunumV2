import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemAddOns } from 'app/shared/model/item-add-ons.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ItemAddOnsService } from './item-add-ons.service';
import { ItemAddOnsDeleteDialogComponent } from './item-add-ons-delete-dialog.component';

@Component({
  selector: 'jhi-item-add-ons',
  templateUrl: './item-add-ons.component.html'
})
export class ItemAddOnsComponent implements OnInit, OnDestroy {
  itemAddOns: IItemAddOns[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected itemAddOnsService: ItemAddOnsService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.itemAddOns = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.itemAddOnsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IItemAddOns[]>) => this.paginateItemAddOns(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.itemAddOns = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInItemAddOns();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IItemAddOns) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInItemAddOns() {
    this.eventSubscriber = this.eventManager.subscribe('itemAddOnsListModification', () => this.reset());
  }

  delete(itemAddOns: IItemAddOns) {
    const modalRef = this.modalService.open(ItemAddOnsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemAddOns = itemAddOns;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateItemAddOns(data: IItemAddOns[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.itemAddOns.push(data[i]);
    }
  }
}
