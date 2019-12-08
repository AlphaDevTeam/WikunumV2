import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IDocumentType, DocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from './document-type.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-document-type-update',
  templateUrl: './document-type-update.component.html'
})
export class DocumentTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  documenthistories: IDocumentHistory[];

  editForm = this.fb.group({
    id: [],
    documentTypeCode: [null, [Validators.required]],
    documentType: [null, [Validators.required]],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected documentTypeService: DocumentTypeService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ documentType }) => {
      this.updateForm(documentType);
    });
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(documentType: IDocumentType) {
    this.editForm.patchValue({
      id: documentType.id,
      documentTypeCode: documentType.documentTypeCode,
      documentType: documentType.documentType,
      history: documentType.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const documentType = this.createFromForm();
    if (documentType.id !== undefined) {
      this.subscribeToSaveResponse(this.documentTypeService.update(documentType));
    } else {
      this.subscribeToSaveResponse(this.documentTypeService.create(documentType));
    }
  }

  private createFromForm(): IDocumentType {
    return {
      ...new DocumentType(),
      id: this.editForm.get(['id']).value,
      documentTypeCode: this.editForm.get(['documentTypeCode']).value,
      documentType: this.editForm.get(['documentType']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentType>>) {
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
