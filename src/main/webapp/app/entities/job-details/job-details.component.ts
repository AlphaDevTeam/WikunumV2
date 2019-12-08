import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobDetails } from 'app/shared/model/job-details.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { JobDetailsService } from './job-details.service';
import { JobDetailsDeleteDialogComponent } from './job-details-delete-dialog.component';

@Component({
  selector: 'jhi-job-details',
  templateUrl: './job-details.component.html'
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  jobDetails: IJobDetails[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected jobDetailsService: JobDetailsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.jobDetails = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.jobDetailsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IJobDetails[]>) => this.paginateJobDetails(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.jobDetails = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInJobDetails();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IJobDetails) {
    return item.id;
  }

  registerChangeInJobDetails() {
    this.eventSubscriber = this.eventManager.subscribe('jobDetailsListModification', () => this.reset());
  }

  delete(jobDetails: IJobDetails) {
    const modalRef = this.modalService.open(JobDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.jobDetails = jobDetails;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateJobDetails(data: IJobDetails[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.jobDetails.push(data[i]);
    }
  }
}
