import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ITransactionType, TransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from './transaction-type.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-transaction-type-update',
  templateUrl: './transaction-type-update.component.html'
})
export class TransactionTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  documenthistories: IDocumentHistory[];

  editForm = this.fb.group({
    id: [],
    transactionypeCode: [null, [Validators.required]],
    transactionType: [null, [Validators.required]],
    isActive: [],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected transactionTypeService: TransactionTypeService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transactionType }) => {
      this.updateForm(transactionType);
    });
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(transactionType: ITransactionType) {
    this.editForm.patchValue({
      id: transactionType.id,
      transactionypeCode: transactionType.transactionypeCode,
      transactionType: transactionType.transactionType,
      isActive: transactionType.isActive,
      history: transactionType.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transactionType = this.createFromForm();
    if (transactionType.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionTypeService.update(transactionType));
    } else {
      this.subscribeToSaveResponse(this.transactionTypeService.create(transactionType));
    }
  }

  private createFromForm(): ITransactionType {
    return {
      ...new TransactionType(),
      id: this.editForm.get(['id']).value,
      transactionypeCode: this.editForm.get(['transactionypeCode']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      isActive: this.editForm.get(['isActive']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionType>>) {
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

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
