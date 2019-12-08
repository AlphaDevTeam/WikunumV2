import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IChangeLog, ChangeLog } from 'app/shared/model/change-log.model';
import { ChangeLogService } from './change-log.service';

@Component({
  selector: 'jhi-change-log-update',
  templateUrl: './change-log-update.component.html'
})
export class ChangeLogUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    changeKey: [null, [Validators.required]],
    changeFrom: [null, [Validators.required]],
    changeTo: [null, [Validators.required]]
  });

  constructor(protected changeLogService: ChangeLogService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ changeLog }) => {
      this.updateForm(changeLog);
    });
  }

  updateForm(changeLog: IChangeLog) {
    this.editForm.patchValue({
      id: changeLog.id,
      changeKey: changeLog.changeKey,
      changeFrom: changeLog.changeFrom,
      changeTo: changeLog.changeTo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const changeLog = this.createFromForm();
    if (changeLog.id !== undefined) {
      this.subscribeToSaveResponse(this.changeLogService.update(changeLog));
    } else {
      this.subscribeToSaveResponse(this.changeLogService.create(changeLog));
    }
  }

  private createFromForm(): IChangeLog {
    return {
      ...new ChangeLog(),
      id: this.editForm.get(['id']).value,
      changeKey: this.editForm.get(['changeKey']).value,
      changeFrom: this.editForm.get(['changeFrom']).value,
      changeTo: this.editForm.get(['changeTo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChangeLog>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
