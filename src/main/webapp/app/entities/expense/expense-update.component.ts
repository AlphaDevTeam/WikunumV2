import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IExpense, Expense } from 'app/shared/model/expense.model';
import { ExpenseService } from './expense.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';

@Component({
  selector: 'jhi-expense-update',
  templateUrl: './expense-update.component.html'
})
export class ExpenseUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  editForm = this.fb.group({
    id: [],
    expenseCode: [null, [Validators.required]],
    expenseName: [null, [Validators.required]],
    expenseLimit: [null, [Validators.required]],
    isActive: [],
    location: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected expenseService: ExpenseService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expense }) => {
      this.updateForm(expense);
    });
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(expense: IExpense) {
    this.editForm.patchValue({
      id: expense.id,
      expenseCode: expense.expenseCode,
      expenseName: expense.expenseName,
      expenseLimit: expense.expenseLimit,
      isActive: expense.isActive,
      location: expense.location
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expense = this.createFromForm();
    if (expense.id !== undefined) {
      this.subscribeToSaveResponse(this.expenseService.update(expense));
    } else {
      this.subscribeToSaveResponse(this.expenseService.create(expense));
    }
  }

  private createFromForm(): IExpense {
    return {
      ...new Expense(),
      id: this.editForm.get(['id']).value,
      expenseCode: this.editForm.get(['expenseCode']).value,
      expenseName: this.editForm.get(['expenseName']).value,
      expenseLimit: this.editForm.get(['expenseLimit']).value,
      isActive: this.editForm.get(['isActive']).value,
      location: this.editForm.get(['location']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpense>>) {
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
}
