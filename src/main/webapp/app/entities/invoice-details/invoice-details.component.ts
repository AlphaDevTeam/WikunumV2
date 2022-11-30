import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvoiceDetails } from 'app/shared/model/invoice-details.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsDeleteDialogComponent } from './invoice-details-delete-dialog.component';

@Component({
  selector: 'jhi-invoice-details',
  templateUrl: './invoice-details.component.html'
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  invoiceDetails: IInvoiceDetails[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected invoiceDetailsService: InvoiceDetailsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.invoiceDetails = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.invoiceDetailsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IInvoiceDetails[]>) => this.paginateInvoiceDetails(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.invoiceDetails = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInInvoiceDetails();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IInvoiceDetails) {
    return item.id;
  }

  registerChangeInInvoiceDetails() {
    this.eventSubscriber = this.eventManager.subscribe('invoiceDetailsListModification', () => this.reset());
  }

  delete(invoiceDetails: IInvoiceDetails) {
    const modalRef = this.modalService.open(InvoiceDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.invoiceDetails = invoiceDetails;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateInvoiceDetails(data: IInvoiceDetails[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.invoiceDetails.push(data[i]);
    }
  }
}
