import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IInvoiceDetails, InvoiceDetails } from 'app/shared/model/invoice-details.model';
import { InvoiceDetailsService } from './invoice-details.service';
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from 'app/entities/invoice/invoice.service';

@Component({
  selector: 'jhi-invoice-details-update',
  templateUrl: './invoice-details-update.component.html'
})
export class InvoiceDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  invoices: IInvoice[];

  editForm = this.fb.group({
    id: [],
    invQty: [null, [Validators.required]],
    revisedItemSalesPrice: [],
    inv: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected invoiceDetailsService: InvoiceDetailsService,
    protected invoiceService: InvoiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ invoiceDetails }) => {
      this.updateForm(invoiceDetails);
    });
    this.invoiceService
      .query()
      .subscribe((res: HttpResponse<IInvoice[]>) => (this.invoices = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(invoiceDetails: IInvoiceDetails) {
    this.editForm.patchValue({
      id: invoiceDetails.id,
      invQty: invoiceDetails.invQty,
      revisedItemSalesPrice: invoiceDetails.revisedItemSalesPrice,
      inv: invoiceDetails.inv
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const invoiceDetails = this.createFromForm();
    if (invoiceDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceDetailsService.update(invoiceDetails));
    } else {
      this.subscribeToSaveResponse(this.invoiceDetailsService.create(invoiceDetails));
    }
  }

  private createFromForm(): IInvoiceDetails {
    return {
      ...new InvoiceDetails(),
      id: this.editForm.get(['id']).value,
      invQty: this.editForm.get(['invQty']).value,
      revisedItemSalesPrice: this.editForm.get(['revisedItemSalesPrice']).value,
      inv: this.editForm.get(['inv']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceDetails>>) {
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

  trackInvoiceById(index: number, item: IInvoice) {
    return item.id;
  }
}
