import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserPermissions } from 'app/shared/model/user-permissions.model';

@Component({
  selector: 'jhi-user-permissions-detail',
  templateUrl: './user-permissions-detail.component.html'
})
export class UserPermissionsDetailComponent implements OnInit {
  userPermissions: IUserPermissions;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userPermissions }) => {
      this.userPermissions = userPermissions;
    });
  }

  previousState() {
    window.history.back();
  }
}
