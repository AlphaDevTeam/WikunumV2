import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IExpenseAccount, ExpenseAccount } from 'app/shared/model/expense-account.model';
import { ExpenseAccountService } from './expense-account.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';
import { IExpense } from 'app/shared/model/expense.model';
import { ExpenseService } from 'app/entities/expense/expense.service';

@Component({
  selector: 'jhi-expense-account-update',
  templateUrl: './expense-account-update.component.html'
})
export class ExpenseAccountUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  transactiontypes: ITransactionType[];

  expenses: IExpense[];
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
    expense: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected expenseAccountService: ExpenseAccountService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected expenseService: ExpenseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expenseAccount }) => {
      this.updateForm(expenseAccount);
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

  updateForm(expenseAccount: IExpenseAccount) {
    this.editForm.patchValue({
      id: expenseAccount.id,
      transactionDate: expenseAccount.transactionDate,
      transactionDescription: expenseAccount.transactionDescription,
      transactionAmountDR: expenseAccount.transactionAmountDR,
      transactionAmountCR: expenseAccount.transactionAmountCR,
      transactionBalance: expenseAccount.transactionBalance,
      location: expenseAccount.location,
      transactionType: expenseAccount.transactionType,
      expense: expenseAccount.expense
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expenseAccount = this.createFromForm();
    if (expenseAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.expenseAccountService.update(expenseAccount));
    } else {
      this.subscribeToSaveResponse(this.expenseAccountService.create(expenseAccount));
    }
  }

  private createFromForm(): IExpenseAccount {
    return {
      ...new ExpenseAccount(),
      id: this.editForm.get(['id']).value,
      transactionDate: this.editForm.get(['transactionDate']).value,
      transactionDescription: this.editForm.get(['transactionDescription']).value,
      transactionAmountDR: this.editForm.get(['transactionAmountDR']).value,
      transactionAmountCR: this.editForm.get(['transactionAmountCR']).value,
      transactionBalance: this.editForm.get(['transactionBalance']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      expense: this.editForm.get(['expense']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpenseAccount>>) {
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
