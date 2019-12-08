import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJob } from 'app/shared/model/job.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { JobService } from './job.service';
import { JobDeleteDialogComponent } from './job-delete-dialog.component';

@Component({
  selector: 'jhi-job',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit, OnDestroy {
  jobs: IJob[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected jobService: JobService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.jobs = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.jobService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IJob[]>) => this.paginateJobs(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.jobs = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInJobs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IJob) {
    return item.id;
  }

  registerChangeInJobs() {
    this.eventSubscriber = this.eventManager.subscribe('jobListModification', () => this.reset());
  }

  delete(job: IJob) {
    const modalRef = this.modalService.open(JobDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.job = job;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateJobs(data: IJob[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.jobs.push(data[i]);
    }
  }
}
