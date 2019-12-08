import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUOM } from 'app/shared/model/uom.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UOMService } from './uom.service';
import { UOMDeleteDialogComponent } from './uom-delete-dialog.component';

@Component({
  selector: 'jhi-uom',
  templateUrl: './uom.component.html'
})
export class UOMComponent implements OnInit, OnDestroy {
  uOMS: IUOM[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected uOMService: UOMService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.uOMS = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.uOMService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUOM[]>) => this.paginateUOMS(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.uOMS = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUOMS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUOM) {
    return item.id;
  }

  registerChangeInUOMS() {
    this.eventSubscriber = this.eventManager.subscribe('uOMListModification', () => this.reset());
  }

  delete(uOM: IUOM) {
    const modalRef = this.modalService.open(UOMDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.uOM = uOM;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUOMS(data: IUOM[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.uOMS.push(data[i]);
    }
  }
}
