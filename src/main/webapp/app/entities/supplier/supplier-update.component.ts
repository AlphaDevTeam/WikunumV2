import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISupplier, Supplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-supplier-update',
  templateUrl: './supplier-update.component.html'
})
export class SupplierUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  documenthistories: IDocumentHistory[];

  editForm = this.fb.group({
    id: [],
    supplierCode: [null, [Validators.required]],
    supplierName: [null, [Validators.required]],
    supplierCreditLimit: [null, [Validators.required]],
    isActive: [],
    rating: [],
    location: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected supplierService: SupplierService,
    protected locationService: LocationService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ supplier }) => {
      this.updateForm(supplier);
    });
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(supplier: ISupplier) {
    this.editForm.patchValue({
      id: supplier.id,
      supplierCode: supplier.supplierCode,
      supplierName: supplier.supplierName,
      supplierCreditLimit: supplier.supplierCreditLimit,
      isActive: supplier.isActive,
      rating: supplier.rating,
      location: supplier.location,
      history: supplier.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const supplier = this.createFromForm();
    if (supplier.id !== undefined) {
      this.subscribeToSaveResponse(this.supplierService.update(supplier));
    } else {
      this.subscribeToSaveResponse(this.supplierService.create(supplier));
    }
  }

  private createFromForm(): ISupplier {
    return {
      ...new Supplier(),
      id: this.editForm.get(['id']).value,
      supplierCode: this.editForm.get(['supplierCode']).value,
      supplierName: this.editForm.get(['supplierName']).value,
      supplierCreditLimit: this.editForm.get(['supplierCreditLimit']).value,
      isActive: this.editForm.get(['isActive']).value,
      rating: this.editForm.get(['rating']).value,
      location: this.editForm.get(['location']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplier>>) {
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

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
