import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICashReceiptVoucherExpense, CashReceiptVoucherExpense } from 'app/shared/model/cash-receipt-voucher-expense.model';
import { CashReceiptVoucherExpenseService } from './cash-receipt-voucher-expense.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';
import { IExpense } from 'app/shared/model/expense.model';
import { ExpenseService } from 'app/entities/expense/expense.service';

@Component({
  selector: 'jhi-cash-receipt-voucher-expense-update',
  templateUrl: './cash-receipt-voucher-expense-update.component.html'
})
export class CashReceiptVoucherExpenseUpdateComponent implements OnInit {
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
    protected cashReceiptVoucherExpenseService: CashReceiptVoucherExpenseService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected expenseService: ExpenseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cashReceiptVoucherExpense }) => {
      this.updateForm(cashReceiptVoucherExpense);
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

  updateForm(cashReceiptVoucherExpense: ICashReceiptVoucherExpense) {
    this.editForm.patchValue({
      id: cashReceiptVoucherExpense.id,
      transactionDate: cashReceiptVoucherExpense.transactionDate,
      transactionDescription: cashReceiptVoucherExpense.transactionDescription,
      transactionAmount: cashReceiptVoucherExpense.transactionAmount,
      location: cashReceiptVoucherExpense.location,
      transactionType: cashReceiptVoucherExpense.transactionType,
      expense: cashReceiptVoucherExpense.expense
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cashReceiptVoucherExpense = this.createFromForm();
    if (cashReceiptVoucherExpense.id !== undefined) {
      this.subscribeToSaveResponse(this.cashReceiptVoucherExpenseService.update(cashReceiptVoucherExpense));
    } else {
      this.subscribeToSaveResponse(this.cashReceiptVoucherExpenseService.create(cashReceiptVoucherExpense));
    }
  }

  private createFromForm(): ICashReceiptVoucherExpense {
    return {
      ...new CashReceiptVoucherExpense(),
      id: this.editForm.get(['id']).value,
      transactionDate: this.editForm.get(['transactionDate']).value,
      transactionDescription: this.editForm.get(['transactionDescription']).value,
      transactionAmount: this.editForm.get(['transactionAmount']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      expense: this.editForm.get(['expense']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICashReceiptVoucherExpense>>) {
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
