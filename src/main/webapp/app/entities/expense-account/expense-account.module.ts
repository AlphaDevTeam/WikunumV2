import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { ExpenseAccountComponent } from './expense-account.component';
import { ExpenseAccountDetailComponent } from './expense-account-detail.component';
import { ExpenseAccountUpdateComponent } from './expense-account-update.component';
import { ExpenseAccountDeleteDialogComponent } from './expense-account-delete-dialog.component';
import { expenseAccountRoute } from './expense-account.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(expenseAccountRoute)],
  declarations: [
    ExpenseAccountComponent,
    ExpenseAccountDetailComponent,
    ExpenseAccountUpdateComponent,
    ExpenseAccountDeleteDialogComponent
  ],
  entryComponents: [ExpenseAccountDeleteDialogComponent]
})
export class WikunumV2ExpenseAccountModule {}
