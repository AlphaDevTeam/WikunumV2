import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserGroup } from 'app/shared/model/user-group.model';

@Component({
  selector: 'jhi-user-group-detail',
  templateUrl: './user-group-detail.component.html'
})
export class UserGroupDetailComponent implements OnInit {
  userGroup: IUserGroup;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userGroup }) => {
      this.userGroup = userGroup;
    });
  }

  previousState() {
    window.history.back();
  }
}
