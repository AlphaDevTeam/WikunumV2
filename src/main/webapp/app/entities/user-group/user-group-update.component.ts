import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IUserGroup, UserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from './user-group.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';
import { IExUser } from 'app/shared/model/ex-user.model';
import { ExUserService } from 'app/entities/ex-user/ex-user.service';

@Component({
  selector: 'jhi-user-group-update',
  templateUrl: './user-group-update.component.html'
})
export class UserGroupUpdateComponent implements OnInit {
  isSaving: boolean;

  documenthistories: IDocumentHistory[];

  exusers: IExUser[];

  editForm = this.fb.group({
    id: [],
    groupName: [null, [Validators.required]],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userGroupService: UserGroupService,
    protected documentHistoryService: DocumentHistoryService,
    protected exUserService: ExUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userGroup }) => {
      this.updateForm(userGroup);
    });
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.exUserService
      .query()
      .subscribe((res: HttpResponse<IExUser[]>) => (this.exusers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userGroup: IUserGroup) {
    this.editForm.patchValue({
      id: userGroup.id,
      groupName: userGroup.groupName,
      history: userGroup.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userGroup = this.createFromForm();
    if (userGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.userGroupService.update(userGroup));
    } else {
      this.subscribeToSaveResponse(this.userGroupService.create(userGroup));
    }
  }

  private createFromForm(): IUserGroup {
    return {
      ...new UserGroup(),
      id: this.editForm.get(['id']).value,
      groupName: this.editForm.get(['groupName']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserGroup>>) {
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

  trackExUserById(index: number, item: IExUser) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
