import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IGoodsReceipt, GoodsReceipt } from 'app/shared/model/goods-receipt.model';
import { GoodsReceiptService } from './goods-receipt.service';
import { ISupplier } from 'app/shared/model/supplier.model';
import { SupplierService } from 'app/entities/supplier/supplier.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-goods-receipt-update',
  templateUrl: './goods-receipt-update.component.html'
})
export class GoodsReceiptUpdateComponent implements OnInit {
  isSaving: boolean;

  suppliers: ISupplier[];

  locations: ILocation[];

  documenthistories: IDocumentHistory[];
  grnDateDp: any;

  editForm = this.fb.group({
    id: [],
    grnNumber: [null, [Validators.required]],
    grnDate: [null, [Validators.required]],
    poNumber: [],
    supplier: [null, Validators.required],
    location: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected goodsReceiptService: GoodsReceiptService,
    protected supplierService: SupplierService,
    protected locationService: LocationService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ goodsReceipt }) => {
      this.updateForm(goodsReceipt);
    });
    this.supplierService
      .query()
      .subscribe((res: HttpResponse<ISupplier[]>) => (this.suppliers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(goodsReceipt: IGoodsReceipt) {
    this.editForm.patchValue({
      id: goodsReceipt.id,
      grnNumber: goodsReceipt.grnNumber,
      grnDate: goodsReceipt.grnDate,
      poNumber: goodsReceipt.poNumber,
      supplier: goodsReceipt.supplier,
      location: goodsReceipt.location,
      history: goodsReceipt.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const goodsReceipt = this.createFromForm();
    if (goodsReceipt.id !== undefined) {
      this.subscribeToSaveResponse(this.goodsReceiptService.update(goodsReceipt));
    } else {
      this.subscribeToSaveResponse(this.goodsReceiptService.create(goodsReceipt));
    }
  }

  private createFromForm(): IGoodsReceipt {
    return {
      ...new GoodsReceipt(),
      id: this.editForm.get(['id']).value,
      grnNumber: this.editForm.get(['grnNumber']).value,
      grnDate: this.editForm.get(['grnDate']).value,
      poNumber: this.editForm.get(['poNumber']).value,
      supplier: this.editForm.get(['supplier']).value,
      location: this.editForm.get(['location']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGoodsReceipt>>) {
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

  trackSupplierById(index: number, item: ISupplier) {
    return item.id;
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
