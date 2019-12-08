import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IDocumentNumberConfig, DocumentNumberConfig } from 'app/shared/model/document-number-config.model';
import { DocumentNumberConfigService } from './document-number-config.service';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type/document-type.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-document-number-config-update',
  templateUrl: './document-number-config-update.component.html'
})
export class DocumentNumberConfigUpdateComponent implements OnInit {
  isSaving: boolean;

  documenttypes: IDocumentType[];

  locations: ILocation[];

  documenthistories: IDocumentHistory[];

  editForm = this.fb.group({
    id: [],
    documentPrefix: [null, [Validators.required]],
    documentPostfix: [],
    currentNumber: [null, [Validators.required]],
    document: [null, Validators.required],
    location: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected documentNumberConfigService: DocumentNumberConfigService,
    protected documentTypeService: DocumentTypeService,
    protected locationService: LocationService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ documentNumberConfig }) => {
      this.updateForm(documentNumberConfig);
    });
    this.documentTypeService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentType[]>) => (this.documenttypes = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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

  updateForm(documentNumberConfig: IDocumentNumberConfig) {
    this.editForm.patchValue({
      id: documentNumberConfig.id,
      documentPrefix: documentNumberConfig.documentPrefix,
      documentPostfix: documentNumberConfig.documentPostfix,
      currentNumber: documentNumberConfig.currentNumber,
      document: documentNumberConfig.document,
      location: documentNumberConfig.location,
      history: documentNumberConfig.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const documentNumberConfig = this.createFromForm();
    if (documentNumberConfig.id !== undefined) {
      this.subscribeToSaveResponse(this.documentNumberConfigService.update(documentNumberConfig));
    } else {
      this.subscribeToSaveResponse(this.documentNumberConfigService.create(documentNumberConfig));
    }
  }

  private createFromForm(): IDocumentNumberConfig {
    return {
      ...new DocumentNumberConfig(),
      id: this.editForm.get(['id']).value,
      documentPrefix: this.editForm.get(['documentPrefix']).value,
      documentPostfix: this.editForm.get(['documentPostfix']).value,
      currentNumber: this.editForm.get(['currentNumber']).value,
      document: this.editForm.get(['document']).value,
      location: this.editForm.get(['location']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentNumberConfig>>) {
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

  trackDocumentTypeById(index: number, item: IDocumentType) {
    return item.id;
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
