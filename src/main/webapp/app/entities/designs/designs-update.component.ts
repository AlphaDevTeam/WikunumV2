import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IDesigns, Designs } from 'app/shared/model/designs.model';
import { DesignsService } from './designs.service';
import { IProducts } from 'app/shared/model/products.model';
import { ProductsService } from 'app/entities/products/products.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-designs-update',
  templateUrl: './designs-update.component.html'
})
export class DesignsUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProducts[];

  locations: ILocation[];

  documenthistories: IDocumentHistory[];

  editForm = this.fb.group({
    id: [],
    designCode: [null, [Validators.required]],
    designName: [null, [Validators.required]],
    designPrefix: [null, [Validators.required]],
    relatedProduct: [null, Validators.required],
    location: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected designsService: DesignsService,
    protected productsService: ProductsService,
    protected locationService: LocationService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ designs }) => {
      this.updateForm(designs);
    });
    this.productsService
      .query()
      .subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
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

  updateForm(designs: IDesigns) {
    this.editForm.patchValue({
      id: designs.id,
      designCode: designs.designCode,
      designName: designs.designName,
      designPrefix: designs.designPrefix,
      relatedProduct: designs.relatedProduct,
      location: designs.location,
      history: designs.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const designs = this.createFromForm();
    if (designs.id !== undefined) {
      this.subscribeToSaveResponse(this.designsService.update(designs));
    } else {
      this.subscribeToSaveResponse(this.designsService.create(designs));
    }
  }

  private createFromForm(): IDesigns {
    return {
      ...new Designs(),
      id: this.editForm.get(['id']).value,
      designCode: this.editForm.get(['designCode']).value,
      designName: this.editForm.get(['designName']).value,
      designPrefix: this.editForm.get(['designPrefix']).value,
      relatedProduct: this.editForm.get(['relatedProduct']).value,
      location: this.editForm.get(['location']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDesigns>>) {
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

  trackProductsById(index: number, item: IProducts) {
    return item.id;
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
