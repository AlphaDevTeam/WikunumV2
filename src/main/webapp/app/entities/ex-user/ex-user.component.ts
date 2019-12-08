import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExUser } from 'app/shared/model/ex-user.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ExUserService } from './ex-user.service';
import { ExUserDeleteDialogComponent } from './ex-user-delete-dialog.component';

@Component({
  selector: 'jhi-ex-user',
  templateUrl: './ex-user.component.html'
})
export class ExUserComponent implements OnInit, OnDestroy {
  exUsers: IExUser[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected exUserService: ExUserService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.exUsers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.exUserService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IExUser[]>) => this.paginateExUsers(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.exUsers = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInExUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExUser) {
    return item.id;
  }

  registerChangeInExUsers() {
    this.eventSubscriber = this.eventManager.subscribe('exUserListModification', () => this.reset());
  }

  delete(exUser: IExUser) {
    const modalRef = this.modalService.open(ExUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exUser = exUser;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExUsers(data: IExUser[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.exUsers.push(data[i]);
    }
  }
}
