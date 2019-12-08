import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IExUser, ExUser } from 'app/shared/model/ex-user.model';
import { ExUserService } from './ex-user.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company/company.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IUserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from 'app/entities/user-group/user-group.service';

@Component({
  selector: 'jhi-ex-user-update',
  templateUrl: './ex-user-update.component.html'
})
export class ExUserUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  companies: ICompany[];

  documenthistories: IDocumentHistory[];

  locations: ILocation[];

  usergroups: IUserGroup[];

  editForm = this.fb.group({
    id: [],
    userKey: [null, [Validators.required]],
    relatedUser: [],
    company: [null, Validators.required],
    history: [],
    locations: [null, Validators.required],
    userGroups: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected exUserService: ExUserService,
    protected userService: UserService,
    protected companyService: CompanyService,
    protected documentHistoryService: DocumentHistoryService,
    protected locationService: LocationService,
    protected userGroupService: UserGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ exUser }) => {
      this.updateForm(exUser);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.companyService.query({ 'exUserId.specified': 'false' }).subscribe(
      (res: HttpResponse<ICompany[]>) => {
        if (!this.editForm.get('company').value || !this.editForm.get('company').value.id) {
          this.companies = res.body;
        } else {
          this.companyService
            .find(this.editForm.get('company').value.id)
            .subscribe(
              (subRes: HttpResponse<ICompany>) => (this.companies = [subRes.body].concat(res.body)),
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
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.userGroupService
      .query()
      .subscribe((res: HttpResponse<IUserGroup[]>) => (this.usergroups = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(exUser: IExUser) {
    this.editForm.patchValue({
      id: exUser.id,
      userKey: exUser.userKey,
      relatedUser: exUser.relatedUser,
      company: exUser.company,
      history: exUser.history,
      locations: exUser.locations,
      userGroups: exUser.userGroups
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const exUser = this.createFromForm();
    if (exUser.id !== undefined) {
      this.subscribeToSaveResponse(this.exUserService.update(exUser));
    } else {
      this.subscribeToSaveResponse(this.exUserService.create(exUser));
    }
  }

  private createFromForm(): IExUser {
    return {
      ...new ExUser(),
      id: this.editForm.get(['id']).value,
      userKey: this.editForm.get(['userKey']).value,
      relatedUser: this.editForm.get(['relatedUser']).value,
      company: this.editForm.get(['company']).value,
      history: this.editForm.get(['history']).value,
      locations: this.editForm.get(['locations']).value,
      userGroups: this.editForm.get(['userGroups']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExUser>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackCompanyById(index: number, item: ICompany) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackUserGroupById(index: number, item: IUserGroup) {
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
