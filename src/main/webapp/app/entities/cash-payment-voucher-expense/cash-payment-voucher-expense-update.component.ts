import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICashPaymentVoucherExpense, CashPaymentVoucherExpense } from 'app/shared/model/cash-payment-voucher-expense.model';
import { CashPaymentVoucherExpenseService } from './cash-payment-voucher-expense.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';
import { IExpense } from 'app/shared/model/expense.model';
import { ExpenseService } from 'app/entities/expense/expense.service';

@Component({
  selector: 'jhi-cash-payment-voucher-expense-update',
  templateUrl: './cash-payment-voucher-expense-update.component.html'
})
export class CashPaymentVoucherExpenseUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  transactiontypes: ITransactionType[];

  expenses: IExpense[];
  transactionDateDp: any;

  editForm = this.fb.group({
    id: [],
    transactionDate: [null, [Validators.required]],
    transactionDescription: [null, [Validators.required]],
    transactionAmount: [null, [Validators.required]],
    location: [null, Validators.required],
    transactionType: [null, Validators.required],
    expense: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cashPaymentVoucherExpenseService: CashPaymentVoucherExpenseService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected expenseService: ExpenseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cashPaymentVoucherExpense }) => {
      this.updateForm(cashPaymentVoucherExpense);
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
    this.expenseService
      .query()
      .subscribe((res: HttpResponse<IExpense[]>) => (this.expenses = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cashPaymentVoucherExpense: ICashPaymentVoucherExpense) {
    this.editForm.patchValue({
      id: cashPaymentVoucherExpense.id,
      transactionDate: cashPaymentVoucherExpense.transactionDate,
      transactionDescription: cashPaymentVoucherExpense.transactionDescription,
      transactionAmount: cashPaymentVoucherExpense.transactionAmount,
      location: cashPaymentVoucherExpense.location,
      transactionType: cashPaymentVoucherExpense.transactionType,
      expense: cashPaymentVoucherExpense.expense
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cashPaymentVoucherExpense = this.createFromForm();
    if (cashPaymentVoucherExpense.id !== undefined) {
      this.subscribeToSaveResponse(this.cashPaymentVoucherExpenseService.update(cashPaymentVoucherExpense));
    } else {
      this.subscribeToSaveResponse(this.cashPaymentVoucherExpenseService.create(cashPaymentVoucherExpense));
    }
  }

  private createFromForm(): ICashPaymentVoucherExpense {
    return {
      ...new CashPaymentVoucherExpense(),
      id: this.editForm.get(['id']).value,
      transactionDate: this.editForm.get(['transactionDate']).value,
      transactionDescription: this.editForm.get(['transactionDescription']).value,
      transactionAmount: this.editForm.get(['transactionAmount']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      expense: this.editForm.get(['expense']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICashPaymentVoucherExpense>>) {
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

  trackExpenseById(index: number, item: IExpense) {
    return item.id;
  }
}
