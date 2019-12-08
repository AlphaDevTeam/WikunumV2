import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICashReceiptVoucherSupplier, CashReceiptVoucherSupplier } from 'app/shared/model/cash-receipt-voucher-supplier.model';
import { CashReceiptVoucherSupplierService } from './cash-receipt-voucher-supplier.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';
import { ISupplier } from 'app/shared/model/supplier.model';
import { SupplierService } from 'app/entities/supplier/supplier.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-cash-receipt-voucher-supplier-update',
  templateUrl: './cash-receipt-voucher-supplier-update.component.html'
})
export class CashReceiptVoucherSupplierUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  transactiontypes: ITransactionType[];

  suppliers: ISupplier[];

  documenthistories: IDocumentHistory[];
  transactionDateDp: any;

  editForm = this.fb.group({
    id: [],
    transactionDate: [null, [Validators.required]],
    transactionDescription: [null, [Validators.required]],
    transactionAmountDR: [null, [Validators.required]],
    transactionAmountCR: [null, [Validators.required]],
    location: [null, Validators.required],
    transactionType: [null, Validators.required],
    supplier: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cashReceiptVoucherSupplierService: CashReceiptVoucherSupplierService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected supplierService: SupplierService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cashReceiptVoucherSupplier }) => {
      this.updateForm(cashReceiptVoucherSupplier);
    });
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.transactionTypeService
      .query()
      .subscribe(
        (res: HttpResponse<ITransactionType[]>) => (this.transactiontypes = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.supplierService
      .query()
      .subscribe((res: HttpResponse<ISupplier[]>) => (this.suppliers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(cashReceiptVoucherSupplier: ICashReceiptVoucherSupplier) {
    this.editForm.patchValue({
      id: cashReceiptVoucherSupplier.id,
      transactionDate: cashReceiptVoucherSupplier.transactionDate,
      transactionDescription: cashReceiptVoucherSupplier.transactionDescription,
      transactionAmountDR: cashReceiptVoucherSupplier.transactionAmountDR,
      transactionAmountCR: cashReceiptVoucherSupplier.transactionAmountCR,
      location: cashReceiptVoucherSupplier.location,
      transactionType: cashReceiptVoucherSupplier.transactionType,
      supplier: cashReceiptVoucherSupplier.supplier,
      history: cashReceiptVoucherSupplier.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cashReceiptVoucherSupplier = this.createFromForm();
    if (cashReceiptVoucherSupplier.id !== undefined) {
      this.subscribeToSaveResponse(this.cashReceiptVoucherSupplierService.update(cashReceiptVoucherSupplier));
    } else {
      this.subscribeToSaveResponse(this.cashReceiptVoucherSupplierService.create(cashReceiptVoucherSupplier));
    }
  }

  private createFromForm(): ICashReceiptVoucherSupplier {
    return {
      ...new CashReceiptVoucherSupplier(),
      id: this.editForm.get(['id']).value,
      transactionDate: this.editForm.get(['transactionDate']).value,
      transactionDescription: this.editForm.get(['transactionDescription']).value,
      transactionAmountDR: this.editForm.get(['transactionAmountDR']).value,
      transactionAmountCR: this.editForm.get(['transactionAmountCR']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      supplier: this.editForm.get(['supplier']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICashReceiptVoucherSupplier>>) {
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

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackTransactionTypeById(index: number, item: ITransactionType) {
    return item.id;
  }

  trackSupplierById(index: number, item: ISupplier) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
