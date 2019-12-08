import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISupplierAccountBalance, SupplierAccountBalance } from 'app/shared/model/supplier-account-balance.model';
import { SupplierAccountBalanceService } from './supplier-account-balance.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';

@Component({
  selector: 'jhi-supplier-account-balance-update',
  templateUrl: './supplier-account-balance-update.component.html'
})
export class SupplierAccountBalanceUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  transactiontypes: ITransactionType[];

  editForm = this.fb.group({
    id: [],
    balance: [null, [Validators.required]],
    location: [null, Validators.required],
    transactionType: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected supplierAccountBalanceService: SupplierAccountBalanceService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ supplierAccountBalance }) => {
      this.updateForm(supplierAccountBalance);
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
  }

  updateForm(supplierAccountBalance: ISupplierAccountBalance) {
    this.editForm.patchValue({
      id: supplierAccountBalance.id,
      balance: supplierAccountBalance.balance,
      location: supplierAccountBalance.location,
      transactionType: supplierAccountBalance.transactionType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const supplierAccountBalance = this.createFromForm();
    if (supplierAccountBalance.id !== undefined) {
      this.subscribeToSaveResponse(this.supplierAccountBalanceService.update(supplierAccountBalance));
    } else {
      this.subscribeToSaveResponse(this.supplierAccountBalanceService.create(supplierAccountBalance));
    }
  }

  private createFromForm(): ISupplierAccountBalance {
    return {
      ...new SupplierAccountBalance(),
      id: this.editForm.get(['id']).value,
      balance: this.editForm.get(['balance']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplierAccountBalance>>) {
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
}
