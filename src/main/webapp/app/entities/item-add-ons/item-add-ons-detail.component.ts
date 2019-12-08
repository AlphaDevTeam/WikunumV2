import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IItemAddOns } from 'app/shared/model/item-add-ons.model';

@Component({
  selector: 'jhi-item-add-ons-detail',
  templateUrl: './item-add-ons-detail.component.html'
})
export class ItemAddOnsDetailComponent implements OnInit {
  itemAddOns: IItemAddOns;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemAddOns }) => {
      this.itemAddOns = itemAddOns;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
