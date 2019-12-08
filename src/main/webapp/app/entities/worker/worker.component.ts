import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorker } from 'app/shared/model/worker.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { WorkerService } from './worker.service';
import { WorkerDeleteDialogComponent } from './worker-delete-dialog.component';

@Component({
  selector: 'jhi-worker',
  templateUrl: './worker.component.html'
})
export class WorkerComponent implements OnInit, OnDestroy {
  workers: IWorker[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected workerService: WorkerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.workers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.workerService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IWorker[]>) => this.paginateWorkers(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.workers = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInWorkers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IWorker) {
    return item.id;
  }

  registerChangeInWorkers() {
    this.eventSubscriber = this.eventManager.subscribe('workerListModification', () => this.reset());
  }

  delete(worker: IWorker) {
    const modalRef = this.modalService.open(WorkerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.worker = worker;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateWorkers(data: IWorker[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.workers.push(data[i]);
    }
  }
}
