import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IExpenseAccountBalance, ExpenseAccountBalance } from 'app/shared/model/expense-account-balance.model';
import { ExpenseAccountBalanceService } from './expense-account-balance.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';
import { IExpense } from 'app/shared/model/expense.model';
import { ExpenseService } from 'app/entities/expense/expense.service';

@Component({
  selector: 'jhi-expense-account-balance-update',
  templateUrl: './expense-account-balance-update.component.html'
})
export class ExpenseAccountBalanceUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  transactiontypes: ITransactionType[];

  expenses: IExpense[];

  editForm = this.fb.group({
    id: [],
    balance: [null, [Validators.required]],
    location: [null, Validators.required],
    transactionType: [null, Validators.required],
    expense: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected expenseAccountBalanceService: ExpenseAccountBalanceService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected expenseService: ExpenseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expenseAccountBalance }) => {
      this.updateForm(expenseAccountBalance);
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

  updateForm(expenseAccountBalance: IExpenseAccountBalance) {
    this.editForm.patchValue({
      id: expenseAccountBalance.id,
      balance: expenseAccountBalance.balance,
      location: expenseAccountBalance.location,
      transactionType: expenseAccountBalance.transactionType,
      expense: expenseAccountBalance.expense
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expenseAccountBalance = this.createFromForm();
    if (expenseAccountBalance.id !== undefined) {
      this.subscribeToSaveResponse(this.expenseAccountBalanceService.update(expenseAccountBalance));
    } else {
      this.subscribeToSaveResponse(this.expenseAccountBalanceService.create(expenseAccountBalance));
    }
  }

  private createFromForm(): IExpenseAccountBalance {
    return {
      ...new ExpenseAccountBalance(),
      id: this.editForm.get(['id']).value,
      balance: this.editForm.get(['balance']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      expense: this.editForm.get(['expense']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpenseAccountBalance>>) {
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
