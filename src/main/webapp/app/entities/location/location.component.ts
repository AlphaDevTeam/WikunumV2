import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocation } from 'app/shared/model/location.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { LocationService } from './location.service';
import { LocationDeleteDialogComponent } from './location-delete-dialog.component';

@Component({
  selector: 'jhi-location',
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit, OnDestroy {
  locations: ILocation[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected locationService: LocationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.locations = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.locationService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ILocation[]>) => this.paginateLocations(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.locations = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILocation) {
    return item.id;
  }

  registerChangeInLocations() {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.reset());
  }

  delete(location: ILocation) {
    const modalRef = this.modalService.open(LocationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateLocations(data: ILocation[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.locations.push(data[i]);
    }
  }
}
