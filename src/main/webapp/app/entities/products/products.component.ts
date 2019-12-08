import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProducts } from 'app/shared/model/products.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProductsService } from './products.service';
import { ProductsDeleteDialogComponent } from './products-delete-dialog.component';

@Component({
  selector: 'jhi-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProducts[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected productsService: ProductsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.products = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.productsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IProducts[]>) => this.paginateProducts(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.products = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInProducts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProducts) {
    return item.id;
  }

  registerChangeInProducts() {
    this.eventSubscriber = this.eventManager.subscribe('productsListModification', () => this.reset());
  }

  delete(products: IProducts) {
    const modalRef = this.modalService.open(ProductsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.products = products;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProducts(data: IProducts[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.products.push(data[i]);
    }
  }
}
