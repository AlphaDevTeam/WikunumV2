import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStorageBin } from 'app/shared/model/storage-bin.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { StorageBinService } from './storage-bin.service';
import { StorageBinDeleteDialogComponent } from './storage-bin-delete-dialog.component';

@Component({
  selector: 'jhi-storage-bin',
  templateUrl: './storage-bin.component.html'
})
export class StorageBinComponent implements OnInit, OnDestroy {
  storageBins: IStorageBin[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected storageBinService: StorageBinService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.storageBins = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.storageBinService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IStorageBin[]>) => this.paginateStorageBins(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.storageBins = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInStorageBins();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStorageBin) {
    return item.id;
  }

  registerChangeInStorageBins() {
    this.eventSubscriber = this.eventManager.subscribe('storageBinListModification', () => this.reset());
  }

  delete(storageBin: IStorageBin) {
    const modalRef = this.modalService.open(StorageBinDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.storageBin = storageBin;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateStorageBins(data: IStorageBin[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.storageBins.push(data[i]);
    }
  }
}
