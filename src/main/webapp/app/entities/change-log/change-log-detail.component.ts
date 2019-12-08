import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChangeLog } from 'app/shared/model/change-log.model';

@Component({
  selector: 'jhi-change-log-detail',
  templateUrl: './change-log-detail.component.html'
})
export class ChangeLogDetailComponent implements OnInit {
  changeLog: IChangeLog;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ changeLog }) => {
      this.changeLog = changeLog;
    });
  }

  previousState() {
    window.history.back();
  }
}
