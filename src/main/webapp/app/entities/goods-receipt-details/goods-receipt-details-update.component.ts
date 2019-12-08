import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IGoodsReceiptDetails, GoodsReceiptDetails } from 'app/shared/model/goods-receipt-details.model';
import { GoodsReceiptDetailsService } from './goods-receipt-details.service';
import { IItems } from 'app/shared/model/items.model';
import { ItemsService } from 'app/entities/items/items.service';
import { IStorageBin } from 'app/shared/model/storage-bin.model';
import { StorageBinService } from 'app/entities/storage-bin/storage-bin.service';
import { IGoodsReceipt } from 'app/shared/model/goods-receipt.model';
import { GoodsReceiptService } from 'app/entities/goods-receipt/goods-receipt.service';

@Component({
  selector: 'jhi-goods-receipt-details-update',
  templateUrl: './goods-receipt-details-update.component.html'
})
export class GoodsReceiptDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItems[];

  storagebins: IStorageBin[];

  goodsreceipts: IGoodsReceipt[];

  editForm = this.fb.group({
    id: [],
    grnQty: [null, [Validators.required]],
    revisedItemCost: [],
    item: [null, Validators.required],
    storageBin: [],
    grn: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected goodsReceiptDetailsService: GoodsReceiptDetailsService,
    protected itemsService: ItemsService,
    protected storageBinService: StorageBinService,
    protected goodsReceiptService: GoodsReceiptService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ goodsReceiptDetails }) => {
      this.updateForm(goodsReceiptDetails);
    });
    this.itemsService
      .query()
      .subscribe((res: HttpResponse<IItems[]>) => (this.items = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.storageBinService
      .query()
      .subscribe(
        (res: HttpResponse<IStorageBin[]>) => (this.storagebins = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.goodsReceiptService
      .query()
      .subscribe(
        (res: HttpResponse<IGoodsReceipt[]>) => (this.goodsreceipts = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(goodsReceiptDetails: IGoodsReceiptDetails) {
    this.editForm.patchValue({
      id: goodsReceiptDetails.id,
      grnQty: goodsReceiptDetails.grnQty,
      revisedItemCost: goodsReceiptDetails.revisedItemCost,
      item: goodsReceiptDetails.item,
      storageBin: goodsReceiptDetails.storageBin,
      grn: goodsReceiptDetails.grn
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const goodsReceiptDetails = this.createFromForm();
    if (goodsReceiptDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.goodsReceiptDetailsService.update(goodsReceiptDetails));
    } else {
      this.subscribeToSaveResponse(this.goodsReceiptDetailsService.create(goodsReceiptDetails));
    }
  }

  private createFromForm(): IGoodsReceiptDetails {
    return {
      ...new GoodsReceiptDetails(),
      id: this.editForm.get(['id']).value,
      grnQty: this.editForm.get(['grnQty']).value,
      revisedItemCost: this.editForm.get(['revisedItemCost']).value,
      item: this.editForm.get(['item']).value,
      storageBin: this.editForm.get(['storageBin']).value,
      grn: this.editForm.get(['grn']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGoodsReceiptDetails>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackItemsById(index: number, item: IItems) {
    return item.id;
  }

  trackStorageBinById(index: number, item: IStorageBin) {
    return item.id;
  }

  trackGoodsReceiptById(index: number, item: IGoodsReceipt) {
    return item.id;
  }
}
