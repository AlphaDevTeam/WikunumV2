import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChangeLog } from 'app/shared/model/change-log.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ChangeLogService } from './change-log.service';
import { ChangeLogDeleteDialogComponent } from './change-log-delete-dialog.component';

@Component({
  selector: 'jhi-change-log',
  templateUrl: './change-log.component.html'
})
export class ChangeLogComponent implements OnInit, OnDestroy {
  changeLogs: IChangeLog[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected changeLogService: ChangeLogService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.changeLogs = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.changeLogService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IChangeLog[]>) => this.paginateChangeLogs(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.changeLogs = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInChangeLogs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IChangeLog) {
    return item.id;
  }

  registerChangeInChangeLogs() {
    this.eventSubscriber = this.eventManager.subscribe('changeLogListModification', () => this.reset());
  }

  delete(changeLog: IChangeLog) {
    const modalRef = this.modalService.open(ChangeLogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.changeLog = changeLog;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateChangeLogs(data: IChangeLog[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.changeLogs.push(data[i]);
    }
  }
}
