import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.WikunumV2ProductsModule)
      },
      {
        path: 'designs',
        loadChildren: () => import('./designs/designs.module').then(m => m.WikunumV2DesignsModule)
      },
      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.WikunumV2JobModule)
      },
      {
        path: 'job-details',
        loadChildren: () => import('./job-details/job-details.module').then(m => m.WikunumV2JobDetailsModule)
      },
      {
        path: 'job-status',
        loadChildren: () => import('./job-status/job-status.module').then(m => m.WikunumV2JobStatusModule)
      },
      {
        path: 'items',
        loadChildren: () => import('./items/items.module').then(m => m.WikunumV2ItemsModule)
      },
      {
        path: 'item-add-ons',
        loadChildren: () => import('./item-add-ons/item-add-ons.module').then(m => m.WikunumV2ItemAddOnsModule)
      },
      {
        path: 'item-bin-card',
        loadChildren: () => import('./item-bin-card/item-bin-card.module').then(m => m.WikunumV2ItemBinCardModule)
      },
      {
        path: 'purchase-order',
        loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.WikunumV2PurchaseOrderModule)
      },
      {
        path: 'purchase-order-details',
        loadChildren: () =>
          import('./purchase-order-details/purchase-order-details.module').then(m => m.WikunumV2PurchaseOrderDetailsModule)
      },
      {
        path: 'goods-receipt',
        loadChildren: () => import('./goods-receipt/goods-receipt.module').then(m => m.WikunumV2GoodsReceiptModule)
      },
      {
        path: 'goods-receipt-details',
        loadChildren: () => import('./goods-receipt-details/goods-receipt-details.module').then(m => m.WikunumV2GoodsReceiptDetailsModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.WikunumV2InvoiceModule)
      },
      {
        path: 'invoice-details',
        loadChildren: () => import('./invoice-details/invoice-details.module').then(m => m.WikunumV2InvoiceDetailsModule)
      },
      {
        path: 'storage-bin',
        loadChildren: () => import('./storage-bin/storage-bin.module').then(m => m.WikunumV2StorageBinModule)
      },
      {
        path: 'uom',
        loadChildren: () => import('./uom/uom.module').then(m => m.WikunumV2UOMModule)
      },
      {
        path: 'currency',
        loadChildren: () => import('./currency/currency.module').then(m => m.WikunumV2CurrencyModule)
      },
      {
        path: 'document-number-config',
        loadChildren: () =>
          import('./document-number-config/document-number-config.module').then(m => m.WikunumV2DocumentNumberConfigModule)
      },
      {
        path: 'user-permissions',
        loadChildren: () => import('./user-permissions/user-permissions.module').then(m => m.WikunumV2UserPermissionsModule)
      },
      {
        path: 'user-group',
        loadChildren: () => import('./user-group/user-group.module').then(m => m.WikunumV2UserGroupModule)
      },
      {
        path: 'menu-items',
        loadChildren: () => import('./menu-items/menu-items.module').then(m => m.WikunumV2MenuItemsModule)
      },
      {
        path: 'cash-payment-voucher-customer',
        loadChildren: () =>
          import('./cash-payment-voucher-customer/cash-payment-voucher-customer.module').then(
            m => m.WikunumV2CashPaymentVoucherCustomerModule
          )
      },
      {
        path: 'cash-receipt-voucher-expense',
        loadChildren: () =>
          import('./cash-receipt-voucher-expense/cash-receipt-voucher-expense.module').then(m => m.WikunumV2CashReceiptVoucherExpenseModule)
      },
      {
        path: 'cash-payment-voucher-expense',
        loadChildren: () =>
          import('./cash-payment-voucher-expense/cash-payment-voucher-expense.module').then(m => m.WikunumV2CashPaymentVoucherExpenseModule)
      },
      {
        path: 'cash-receipt-voucher-customer',
        loadChildren: () =>
          import('./cash-receipt-voucher-customer/cash-receipt-voucher-customer.module').then(
            m => m.WikunumV2CashReceiptVoucherCustomerModule
          )
      },
      {
        path: 'cash-payment-voucher-supplier',
        loadChildren: () =>
          import('./cash-payment-voucher-supplier/cash-payment-voucher-supplier.module').then(
            m => m.WikunumV2CashPaymentVoucherSupplierModule
          )
      },
      {
        path: 'cash-receipt-voucher-supplier',
        loadChildren: () =>
          import('./cash-receipt-voucher-supplier/cash-receipt-voucher-supplier.module').then(
            m => m.WikunumV2CashReceiptVoucherSupplierModule
          )
      },
      {
        path: 'cash-book',
        loadChildren: () => import('./cash-book/cash-book.module').then(m => m.WikunumV2CashBookModule)
      },
      {
        path: 'cash-book-balance',
        loadChildren: () => import('./cash-book-balance/cash-book-balance.module').then(m => m.WikunumV2CashBookBalanceModule)
      },
      {
        path: 'customer-account',
        loadChildren: () => import('./customer-account/customer-account.module').then(m => m.WikunumV2CustomerAccountModule)
      },
      {
        path: 'customer-account-balance',
        loadChildren: () =>
          import('./customer-account-balance/customer-account-balance.module').then(m => m.WikunumV2CustomerAccountBalanceModule)
      },
      {
        path: 'supplier-account',
        loadChildren: () => import('./supplier-account/supplier-account.module').then(m => m.WikunumV2SupplierAccountModule)
      },
      {
        path: 'supplier-account-balance',
        loadChildren: () =>
          import('./supplier-account-balance/supplier-account-balance.module').then(m => m.WikunumV2SupplierAccountBalanceModule)
      },
      {
        path: 'purchase-account',
        loadChildren: () => import('./purchase-account/purchase-account.module').then(m => m.WikunumV2PurchaseAccountModule)
      },
      {
        path: 'purchase-account-balance',
        loadChildren: () =>
          import('./purchase-account-balance/purchase-account-balance.module').then(m => m.WikunumV2PurchaseAccountBalanceModule)
      },
      {
        path: 'sales-account',
        loadChildren: () => import('./sales-account/sales-account.module').then(m => m.WikunumV2SalesAccountModule)
      },
      {
        path: 'sales-account-balance',
        loadChildren: () => import('./sales-account-balance/sales-account-balance.module').then(m => m.WikunumV2SalesAccountBalanceModule)
      },
      {
        path: 'expense-account',
        loadChildren: () => import('./expense-account/expense-account.module').then(m => m.WikunumV2ExpenseAccountModule)
      },
      {
        path: 'expense-account-balance',
        loadChildren: () =>
          import('./expense-account-balance/expense-account-balance.module').then(m => m.WikunumV2ExpenseAccountBalanceModule)
      },
      {
        path: 'document-type',
        loadChildren: () => import('./document-type/document-type.module').then(m => m.WikunumV2DocumentTypeModule)
      },
      {
        path: 'document-history',
        loadChildren: () => import('./document-history/document-history.module').then(m => m.WikunumV2DocumentHistoryModule)
      },
      {
        path: 'change-log',
        loadChildren: () => import('./change-log/change-log.module').then(m => m.WikunumV2ChangeLogModule)
      },
      {
        path: 'transaction-type',
        loadChildren: () => import('./transaction-type/transaction-type.module').then(m => m.WikunumV2TransactionTypeModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.WikunumV2LocationModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.WikunumV2CustomerModule)
      },
      {
        path: 'supplier',
        loadChildren: () => import('./supplier/supplier.module').then(m => m.WikunumV2SupplierModule)
      },
      {
        path: 'expense',
        loadChildren: () => import('./expense/expense.module').then(m => m.WikunumV2ExpenseModule)
      },
      {
        path: 'worker',
        loadChildren: () => import('./worker/worker.module').then(m => m.WikunumV2WorkerModule)
      },
      {
        path: 'ex-user',
        loadChildren: () => import('./ex-user/ex-user.module').then(m => m.WikunumV2ExUserModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.WikunumV2StockModule)
      },
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.WikunumV2CompanyModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class WikunumV2EntityModule {}
