import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMenuItems } from 'app/shared/model/menu-items.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsDeleteDialogComponent } from './menu-items-delete-dialog.component';

@Component({
  selector: 'jhi-menu-items',
  templateUrl: './menu-items.component.html'
})
export class MenuItemsComponent implements OnInit, OnDestroy {
  menuItems: IMenuItems[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected menuItemsService: MenuItemsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.menuItems = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.menuItemsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IMenuItems[]>) => this.paginateMenuItems(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.menuItems = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInMenuItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMenuItems) {
    return item.id;
  }

  registerChangeInMenuItems() {
    this.eventSubscriber = this.eventManager.subscribe('menuItemsListModification', () => this.reset());
  }

  delete(menuItems: IMenuItems) {
    const modalRef = this.modalService.open(MenuItemsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.menuItems = menuItems;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateMenuItems(data: IMenuItems[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.menuItems.push(data[i]);
    }
  }
}
