import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISalesAccountBalance, SalesAccountBalance } from 'app/shared/model/sales-account-balance.model';
import { SalesAccountBalanceService } from './sales-account-balance.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';

@Component({
  selector: 'jhi-sales-account-balance-update',
  templateUrl: './sales-account-balance-update.component.html'
})
export class SalesAccountBalanceUpdateComponent implements OnInit {
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
    protected salesAccountBalanceService: SalesAccountBalanceService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ salesAccountBalance }) => {
      this.updateForm(salesAccountBalance);
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

  updateForm(salesAccountBalance: ISalesAccountBalance) {
    this.editForm.patchValue({
      id: salesAccountBalance.id,
      balance: salesAccountBalance.balance,
      location: salesAccountBalance.location,
      transactionType: salesAccountBalance.transactionType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const salesAccountBalance = this.createFromForm();
    if (salesAccountBalance.id !== undefined) {
      this.subscribeToSaveResponse(this.salesAccountBalanceService.update(salesAccountBalance));
    } else {
      this.subscribeToSaveResponse(this.salesAccountBalanceService.create(salesAccountBalance));
    }
  }

  private createFromForm(): ISalesAccountBalance {
    return {
      ...new SalesAccountBalance(),
      id: this.editForm.get(['id']).value,
      balance: this.editForm.get(['balance']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISalesAccountBalance>>) {
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
