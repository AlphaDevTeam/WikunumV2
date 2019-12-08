import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentNumberConfig } from 'app/shared/model/document-number-config.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DocumentNumberConfigService } from './document-number-config.service';
import { DocumentNumberConfigDeleteDialogComponent } from './document-number-config-delete-dialog.component';

@Component({
  selector: 'jhi-document-number-config',
  templateUrl: './document-number-config.component.html'
})
export class DocumentNumberConfigComponent implements OnInit, OnDestroy {
  documentNumberConfigs: IDocumentNumberConfig[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected documentNumberConfigService: DocumentNumberConfigService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.documentNumberConfigs = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.documentNumberConfigService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDocumentNumberConfig[]>) => this.paginateDocumentNumberConfigs(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.documentNumberConfigs = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDocumentNumberConfigs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocumentNumberConfig) {
    return item.id;
  }

  registerChangeInDocumentNumberConfigs() {
    this.eventSubscriber = this.eventManager.subscribe('documentNumberConfigListModification', () => this.reset());
  }

  delete(documentNumberConfig: IDocumentNumberConfig) {
    const modalRef = this.modalService.open(DocumentNumberConfigDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentNumberConfig = documentNumberConfig;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDocumentNumberConfigs(data: IDocumentNumberConfig[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.documentNumberConfigs.push(data[i]);
    }
  }
}
