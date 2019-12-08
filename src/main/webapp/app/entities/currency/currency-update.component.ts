import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICurrency, Currency } from 'app/shared/model/currency.model';
import { CurrencyService } from './currency.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-currency-update',
  templateUrl: './currency-update.component.html'
})
export class CurrencyUpdateComponent implements OnInit {
  isSaving: boolean;

  documenthistories: IDocumentHistory[];

  editForm = this.fb.group({
    id: [],
    currencyCode: [null, [Validators.required]],
    currencyName: [null, [Validators.required]],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected currencyService: CurrencyService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ currency }) => {
      this.updateForm(currency);
    });
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(currency: ICurrency) {
    this.editForm.patchValue({
      id: currency.id,
      currencyCode: currency.currencyCode,
      currencyName: currency.currencyName,
      history: currency.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const currency = this.createFromForm();
    if (currency.id !== undefined) {
      this.subscribeToSaveResponse(this.currencyService.update(currency));
    } else {
      this.subscribeToSaveResponse(this.currencyService.create(currency));
    }
  }

  private createFromForm(): ICurrency {
    return {
      ...new Currency(),
      id: this.editForm.get(['id']).value,
      currencyCode: this.editForm.get(['currencyCode']).value,
      currencyName: this.editForm.get(['currencyName']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurrency>>) {
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
