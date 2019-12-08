import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IStorageBin, StorageBin } from 'app/shared/model/storage-bin.model';
import { StorageBinService } from './storage-bin.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-storage-bin-update',
  templateUrl: './storage-bin-update.component.html'
})
export class StorageBinUpdateComponent implements OnInit {
  isSaving: boolean;

  documenthistories: IDocumentHistory[];

  editForm = this.fb.group({
    id: [],
    binNumber: [null, [Validators.required]],
    binDescription: [null, [Validators.required]],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected storageBinService: StorageBinService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ storageBin }) => {
      this.updateForm(storageBin);
    });
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(storageBin: IStorageBin) {
    this.editForm.patchValue({
      id: storageBin.id,
      binNumber: storageBin.binNumber,
      binDescription: storageBin.binDescription,
      history: storageBin.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const storageBin = this.createFromForm();
    if (storageBin.id !== undefined) {
      this.subscribeToSaveResponse(this.storageBinService.update(storageBin));
    } else {
      this.subscribeToSaveResponse(this.storageBinService.create(storageBin));
    }
  }

  private createFromForm(): IStorageBin {
    return {
      ...new StorageBin(),
      id: this.editForm.get(['id']).value,
      binNumber: this.editForm.get(['binNumber']).value,
      binDescription: this.editForm.get(['binDescription']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStorageBin>>) {
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
