import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplier } from 'app/shared/model/supplier.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SupplierService } from './supplier.service';
import { SupplierDeleteDialogComponent } from './supplier-delete-dialog.component';

@Component({
  selector: 'jhi-supplier',
  templateUrl: './supplier.component.html'
})
export class SupplierComponent implements OnInit, OnDestroy {
  suppliers: ISupplier[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected supplierService: SupplierService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.suppliers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.supplierService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISupplier[]>) => this.paginateSuppliers(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.suppliers = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSuppliers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISupplier) {
    return item.id;
  }

  registerChangeInSuppliers() {
    this.eventSubscriber = this.eventManager.subscribe('supplierListModification', () => this.reset());
  }

  delete(supplier: ISupplier) {
    const modalRef = this.modalService.open(SupplierDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supplier = supplier;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSuppliers(data: ISupplier[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.suppliers.push(data[i]);
    }
  }
}
