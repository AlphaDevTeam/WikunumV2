import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICashReceiptVoucherCustomer, CashReceiptVoucherCustomer } from 'app/shared/model/cash-receipt-voucher-customer.model';
import { CashReceiptVoucherCustomerService } from './cash-receipt-voucher-customer.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { TransactionTypeService } from 'app/entities/transaction-type/transaction-type.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-cash-receipt-voucher-customer-update',
  templateUrl: './cash-receipt-voucher-customer-update.component.html'
})
export class CashReceiptVoucherCustomerUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  transactiontypes: ITransactionType[];

  customers: ICustomer[];

  documenthistories: IDocumentHistory[];
  transactionDateDp: any;

  editForm = this.fb.group({
    id: [],
    transactionDate: [null, [Validators.required]],
    transactionDescription: [null, [Validators.required]],
    transactionAmount: [null, [Validators.required]],
    location: [null, Validators.required],
    transactionType: [null, Validators.required],
    customer: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cashReceiptVoucherCustomerService: CashReceiptVoucherCustomerService,
    protected locationService: LocationService,
    protected transactionTypeService: TransactionTypeService,
    protected customerService: CustomerService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cashReceiptVoucherCustomer }) => {
      this.updateForm(cashReceiptVoucherCustomer);
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
    this.customerService
      .query()
      .subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(cashReceiptVoucherCustomer: ICashReceiptVoucherCustomer) {
    this.editForm.patchValue({
      id: cashReceiptVoucherCustomer.id,
      transactionDate: cashReceiptVoucherCustomer.transactionDate,
      transactionDescription: cashReceiptVoucherCustomer.transactionDescription,
      transactionAmount: cashReceiptVoucherCustomer.transactionAmount,
      location: cashReceiptVoucherCustomer.location,
      transactionType: cashReceiptVoucherCustomer.transactionType,
      customer: cashReceiptVoucherCustomer.customer,
      history: cashReceiptVoucherCustomer.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cashReceiptVoucherCustomer = this.createFromForm();
    if (cashReceiptVoucherCustomer.id !== undefined) {
      this.subscribeToSaveResponse(this.cashReceiptVoucherCustomerService.update(cashReceiptVoucherCustomer));
    } else {
      this.subscribeToSaveResponse(this.cashReceiptVoucherCustomerService.create(cashReceiptVoucherCustomer));
    }
  }

  private createFromForm(): ICashReceiptVoucherCustomer {
    return {
      ...new CashReceiptVoucherCustomer(),
      id: this.editForm.get(['id']).value,
      transactionDate: this.editForm.get(['transactionDate']).value,
      transactionDescription: this.editForm.get(['transactionDescription']).value,
      transactionAmount: this.editForm.get(['transactionAmount']).value,
      location: this.editForm.get(['location']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      customer: this.editForm.get(['customer']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICashReceiptVoucherCustomer>>) {
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

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
