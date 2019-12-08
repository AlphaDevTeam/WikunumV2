import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDocumentHistory, DocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from './document-history.service';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type/document-type.service';
import { IExUser } from 'app/shared/model/ex-user.model';
import { ExUserService } from 'app/entities/ex-user/ex-user.service';
import { IChangeLog } from 'app/shared/model/change-log.model';
import { ChangeLogService } from 'app/entities/change-log/change-log.service';

@Component({
  selector: 'jhi-document-history-update',
  templateUrl: './document-history-update.component.html'
})
export class DocumentHistoryUpdateComponent implements OnInit {
  isSaving: boolean;

  documenttypes: IDocumentType[];

  exusers: IExUser[];

  changelogs: IChangeLog[];
  historyDateDp: any;

  editForm = this.fb.group({
    id: [],
    historyDescription: [null, [Validators.required]],
    historyDate: [null, [Validators.required]],
    type: [null, Validators.required],
    user: [null, Validators.required],
    changeLog: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected documentHistoryService: DocumentHistoryService,
    protected documentTypeService: DocumentTypeService,
    protected exUserService: ExUserService,
    protected changeLogService: ChangeLogService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ documentHistory }) => {
      this.updateForm(documentHistory);
    });
    this.documentTypeService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentType[]>) => (this.documenttypes = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.exUserService
      .query()
      .subscribe((res: HttpResponse<IExUser[]>) => (this.exusers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.changeLogService
      .query()
      .subscribe((res: HttpResponse<IChangeLog[]>) => (this.changelogs = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(documentHistory: IDocumentHistory) {
    this.editForm.patchValue({
      id: documentHistory.id,
      historyDescription: documentHistory.historyDescription,
      historyDate: documentHistory.historyDate,
      type: documentHistory.type,
      user: documentHistory.user,
      changeLog: documentHistory.changeLog
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const documentHistory = this.createFromForm();
    if (documentHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.documentHistoryService.update(documentHistory));
    } else {
      this.subscribeToSaveResponse(this.documentHistoryService.create(documentHistory));
    }
  }

  private createFromForm(): IDocumentHistory {
    return {
      ...new DocumentHistory(),
      id: this.editForm.get(['id']).value,
      historyDescription: this.editForm.get(['historyDescription']).value,
      historyDate: this.editForm.get(['historyDate']).value,
      type: this.editForm.get(['type']).value,
      user: this.editForm.get(['user']).value,
      changeLog: this.editForm.get(['changeLog']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentHistory>>) {
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

  trackExUserById(index: number, item: IExUser) {
    return item.id;
  }

  trackChangeLogById(index: number, item: IChangeLog) {
    return item.id;
  }
}
