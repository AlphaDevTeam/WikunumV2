import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserGroup } from 'app/shared/model/user-group.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UserGroupService } from './user-group.service';
import { UserGroupDeleteDialogComponent } from './user-group-delete-dialog.component';

@Component({
  selector: 'jhi-user-group',
  templateUrl: './user-group.component.html'
})
export class UserGroupComponent implements OnInit, OnDestroy {
  userGroups: IUserGroup[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected userGroupService: UserGroupService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.userGroups = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.userGroupService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUserGroup[]>) => this.paginateUserGroups(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.userGroups = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUserGroups();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserGroup) {
    return item.id;
  }

  registerChangeInUserGroups() {
    this.eventSubscriber = this.eventManager.subscribe('userGroupListModification', () => this.reset());
  }

  delete(userGroup: IUserGroup) {
    const modalRef = this.modalService.open(UserGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userGroup = userGroup;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUserGroups(data: IUserGroup[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.userGroups.push(data[i]);
    }
  }
}
