import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IInvoice, Invoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { IItems } from 'app/shared/model/items.model';
import { ItemsService } from 'app/entities/items/items.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-invoice-update',
  templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItems[];

  documenthistories: IDocumentHistory[];
  invDateDp: any;

  editForm = this.fb.group({
    id: [],
    invNumber: [null, [Validators.required]],
    invDate: [null, [Validators.required]],
    item: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected invoiceService: InvoiceService,
    protected itemsService: ItemsService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ invoice }) => {
      this.updateForm(invoice);
    });
    this.itemsService
      .query()
      .subscribe((res: HttpResponse<IItems[]>) => (this.items = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(invoice: IInvoice) {
    this.editForm.patchValue({
      id: invoice.id,
      invNumber: invoice.invNumber,
      invDate: invoice.invDate,
      item: invoice.item,
      history: invoice.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const invoice = this.createFromForm();
    if (invoice.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceService.update(invoice));
    } else {
      this.subscribeToSaveResponse(this.invoiceService.create(invoice));
    }
  }

  private createFromForm(): IInvoice {
    return {
      ...new Invoice(),
      id: this.editForm.get(['id']).value,
      invNumber: this.editForm.get(['invNumber']).value,
      invDate: this.editForm.get(['invDate']).value,
      item: this.editForm.get(['item']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>) {
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

  trackItemsById(index: number, item: IItems) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
