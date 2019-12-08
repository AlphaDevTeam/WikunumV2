import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserPermissions } from 'app/shared/model/user-permissions.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsDeleteDialogComponent } from './user-permissions-delete-dialog.component';

@Component({
  selector: 'jhi-user-permissions',
  templateUrl: './user-permissions.component.html'
})
export class UserPermissionsComponent implements OnInit, OnDestroy {
  userPermissions: IUserPermissions[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected userPermissionsService: UserPermissionsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.userPermissions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.userPermissionsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUserPermissions[]>) => this.paginateUserPermissions(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.userPermissions = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUserPermissions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserPermissions) {
    return item.id;
  }

  registerChangeInUserPermissions() {
    this.eventSubscriber = this.eventManager.subscribe('userPermissionsListModification', () => this.reset());
  }

  delete(userPermissions: IUserPermissions) {
    const modalRef = this.modalService.open(UserPermissionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userPermissions = userPermissions;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUserPermissions(data: IUserPermissions[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.userPermissions.push(data[i]);
    }
  }
}
