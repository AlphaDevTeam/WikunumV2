import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDesigns } from 'app/shared/model/designs.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DesignsService } from './designs.service';
import { DesignsDeleteDialogComponent } from './designs-delete-dialog.component';

@Component({
  selector: 'jhi-designs',
  templateUrl: './designs.component.html'
})
export class DesignsComponent implements OnInit, OnDestroy {
  designs: IDesigns[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected designsService: DesignsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.designs = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.designsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDesigns[]>) => this.paginateDesigns(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.designs = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDesigns();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDesigns) {
    return item.id;
  }

  registerChangeInDesigns() {
    this.eventSubscriber = this.eventManager.subscribe('designsListModification', () => this.reset());
  }

  delete(designs: IDesigns) {
    const modalRef = this.modalService.open(DesignsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.designs = designs;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDesigns(data: IDesigns[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.designs.push(data[i]);
    }
  }
}
