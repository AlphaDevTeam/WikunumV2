import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPurchaseAccount, PurchaseAccount } from 'app/shared/model/purchase-account.model';
import { PurchaseAccountService } from './purchase-account.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-purchase-account-update',
  templateUrl: './purchase-account-update.component.html'
})
export class PurchaseAccountUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  transactiontypes: ITransactionType[];

  documenthistories: IDocumentHistory[];
  transactionDateDp: any;

  editForm = this.fb.group({
    id: [],
    transactionDate: [null, [Validators.required]],
    transactionDescription: [null, [Validators.required]],
    transactionAmountDR: [null, [Validators.required]],
    transactionAmountCR: [null, [Validators.required]],
    transactionBalance: [null, [Validators.required]],
    location: [null, Validators.required],
    transactionType: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected purchaseAccountService: PurchaseAccountService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ purchaseAccount }) => {
      this.updateForm(purchaseAccount);
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
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(purchaseAccount: IPurchaseAccount) {
    this.editForm.patchValue({
      id: purchaseAccount.id,
      transactionDate: purchaseAccount.transactionDate,
      transactionDescription: purchaseAccount.transactionDescription,
      transactionAmountDR: purchaseAccount.transactionAmountDR,
      transactionAmountCR: purchaseAccount.transactionAmountCR,
      transactionBalance: purchaseAccount.transactionBalance,
      location: purchaseAccount.location,
      transactionType: purchaseAccount.transactionType,
      history: purchaseAccount.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const purchaseAccount = this.createFromForm();
    if (purchaseAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseAccountService.update(purchaseAccount));
    } else {
      this.subscribeToSaveResponse(this.purchaseAccountService.create(purchaseAccount));
    }
  }

  private createFromForm(): IPurchaseAccount {
    return {
      ...new PurchaseAccount(),
      id: this.editForm.get(['id']).value,
      transactionDate: this.editForm.get(['transactionDate']).value,
      transactionDescription: this.editForm.get(['transactionDescription']).value,
      transactionAmountDR: this.editForm.get(['transactionAmountDR']).value,
      transactionAmountCR: this.editForm.get(['transactionAmountCR']).value,
      transactionBalance: this.editForm.get(['transactionBalance']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseAccount>>) {
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

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
