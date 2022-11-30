import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IUserPermissions, UserPermissions } from 'app/shared/model/user-permissions.model';
import { UserPermissionsService } from './user-permissions.service';
import { IExUser } from 'app/shared/model/ex-user.model';
import { ExUserService } from 'app/entities/ex-user/ex-user.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';
import { IUserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from 'app/entities/user-group/user-group.service';

@Component({
  selector: 'jhi-user-permissions-update',
  templateUrl: './user-permissions-update.component.html'
})
export class UserPermissionsUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IExUser[];

  documenthistories: IDocumentHistory[];

  usergroups: IUserGroup[];

  editForm = this.fb.group({
    id: [],
    userPermKey: [],
    userPermDescription: [],
    isActive: [],
    user: [null, Validators.required],
    history: [],
    userGroup: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userPermissionsService: UserPermissionsService,
    protected exUserService: ExUserService,
    protected documentHistoryService: DocumentHistoryService,
    protected userGroupService: UserGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userPermissions }) => {
      this.updateForm(userPermissions);
    });
    this.exUserService.query({ 'userPermissionsId.specified': 'false' }).subscribe(
      (res: HttpResponse<IExUser[]>) => {
        if (!this.editForm.get('user').value || !this.editForm.get('user').value.id) {
          this.users = res.body;
        } else {
          this.exUserService
            .find(this.editForm.get('user').value.id)
            .subscribe(
              (subRes: HttpResponse<IExUser>) => (this.users = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.userGroupService
      .query()
      .subscribe((res: HttpResponse<IUserGroup[]>) => (this.usergroups = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userPermissions: IUserPermissions) {
    this.editForm.patchValue({
      id: userPermissions.id,
      userPermKey: userPermissions.userPermKey,
      userPermDescription: userPermissions.userPermDescription,
      isActive: userPermissions.isActive,
      user: userPermissions.user,
      history: userPermissions.history,
      userGroup: userPermissions.userGroup
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userPermissions = this.createFromForm();
    if (userPermissions.id !== undefined) {
      this.subscribeToSaveResponse(this.userPermissionsService.update(userPermissions));
    } else {
      this.subscribeToSaveResponse(this.userPermissionsService.create(userPermissions));
    }
  }

  private createFromForm(): IUserPermissions {
    return {
      ...new UserPermissions(),
      id: this.editForm.get(['id']).value,
      userPermKey: this.editForm.get(['userPermKey']).value,
      userPermDescription: this.editForm.get(['userPermDescription']).value,
      isActive: this.editForm.get(['isActive']).value,
      user: this.editForm.get(['user']).value,
      history: this.editForm.get(['history']).value,
      userGroup: this.editForm.get(['userGroup']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserPermissions>>) {
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

  trackExUserById(index: number, item: IExUser) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }

  trackUserGroupById(index: number, item: IUserGroup) {
    return item.id;
  }
}
