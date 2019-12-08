import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemBinCard } from 'app/shared/model/item-bin-card.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ItemBinCardService } from './item-bin-card.service';
import { ItemBinCardDeleteDialogComponent } from './item-bin-card-delete-dialog.component';

@Component({
  selector: 'jhi-item-bin-card',
  templateUrl: './item-bin-card.component.html'
})
export class ItemBinCardComponent implements OnInit, OnDestroy {
  itemBinCards: IItemBinCard[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected itemBinCardService: ItemBinCardService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.itemBinCards = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.itemBinCardService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IItemBinCard[]>) => this.paginateItemBinCards(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.itemBinCards = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInItemBinCards();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IItemBinCard) {
    return item.id;
  }

  registerChangeInItemBinCards() {
    this.eventSubscriber = this.eventManager.subscribe('itemBinCardListModification', () => this.reset());
  }

  delete(itemBinCard: IItemBinCard) {
    const modalRef = this.modalService.open(ItemBinCardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemBinCard = itemBinCard;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateItemBinCards(data: IItemBinCard[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.itemBinCards.push(data[i]);
    }
  }
}
