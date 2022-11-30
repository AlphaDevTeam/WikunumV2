package com.alphadevs.sales.service;

import com.alphadevs.sales.domain.*;
import com.alphadevs.sales.repository.GoodsReceiptDetailsRepository;
import com.alphadevs.sales.repository.GoodsReceiptRepository;
import com.alphadevs.sales.security.DocumentConstants;
import com.alphadevs.sales.security.SecurityUtils;
import com.alphadevs.sales.service.dto.PurchaseAccountBalanceCriteria;
import com.alphadevs.sales.service.dto.StockCriteria;
import com.alphadevs.sales.service.dto.SupplierAccountBalanceCriteria;
import com.alphadevs.sales.service.dto.TransactionTypeCriteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.LongFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static com.alphadevs.sales.security.AuthoritiesConstants.ADMIN;

/**
 * Service Implementation for managing {@link GoodsReceipt}.
 */
@Service
@Transactional
public class GoodsReceiptService {

    private final Logger log = LoggerFactory.getLogger(GoodsReceiptService.class);

    private final GoodsReceiptRepository goodsReceiptRepository;
    private final GoodsReceiptDetailsRepository goodsReceiptDetailsRepository;
    private final UserService userService;
    private final StockService stockService;
    private final StockQueryService stockQueryService;
    private final PurchaseAccountBalanceQueryService purchaseAccountBalanceQueryService;
    private final ItemBinCardService itemBinCardService;
    private final ItemsService itemsService;
    private final PurchaseAccountService purchaseAccountService;
    private final SupplierAccountService supplierAccountService;
    private final SupplierAccountBalanceQueryService supplierAccountBalanceQueryService;
    private final TransactionTypeQueryService transactionTypeQueryService;
    private final SupplierAccountBalanceService supplierAccountBalanceService;
    private final PurchaseAccountBalanceService purchaseAccountBalanceService;

    public GoodsReceiptService(GoodsReceiptRepository goodsReceiptRepository, GoodsReceiptDetailsRepository goodsReceiptDetailsRepository, UserService userService, StockService stockService, StockQueryService stockQueryService, PurchaseAccountBalanceQueryService purchaseAccountBalanceQueryService, ItemBinCardService itemBinCardService, ItemsService itemsService, PurchaseAccountService purchaseAccountService, SupplierAccountService supplierAccountService, SupplierAccountBalanceQueryService supplierAccountBalanceQueryService, TransactionTypeQueryService transactionTypeQueryService, SupplierAccountBalanceService supplierAccountBalanceService, PurchaseAccountBalanceService purchaseAccountBalanceService) {
        this.goodsReceiptRepository = goodsReceiptRepository;
        this.goodsReceiptDetailsRepository = goodsReceiptDetailsRepository;
        this.userService = userService;
        this.stockService = stockService;
        this.stockQueryService = stockQueryService;
        this.purchaseAccountBalanceQueryService = purchaseAccountBalanceQueryService;
        this.itemBinCardService = itemBinCardService;
        this.itemsService = itemsService;
        this.purchaseAccountService = purchaseAccountService;
        this.supplierAccountService = supplierAccountService;
        this.supplierAccountBalanceQueryService = supplierAccountBalanceQueryService;
        this.supplierAccountBalanceService = supplierAccountBalanceService;
        this.transactionTypeQueryService = transactionTypeQueryService;
        this.purchaseAccountBalanceService = purchaseAccountBalanceService;
    }

    /**
     * Save a goodsReceipt.
     *
     * @param goodsReceipt the entity to save.
     * @return the persisted entity.
     */
    public GoodsReceipt save(GoodsReceipt goodsReceipt) {
        log.debug("Request to save GoodsReceipt : {}", goodsReceipt);
        GoodsReceipt savedGoodsReceipt = new GoodsReceipt();
        ExUser exUser = null;

        //Filter Variables
        LongFilter longFilterCompanyId = new LongFilter();
        LongFilter longFilterLocationId = new LongFilter();
        LongFilter longFilterItemId = new LongFilter();
        LongFilter longFilterSupplierId = new LongFilter();

        //FixMe - HardCoding the Transaction Type
        LongFilter longFilterTransactionId = new LongFilter();
        longFilterTransactionId.setEquals(1L);
        BooleanFilter booleanFilterTrue = new BooleanFilter();
        booleanFilterTrue.setEquals(true);

        //get Transactional Type
        TransactionTypeCriteria transactionTypeCriteria = new TransactionTypeCriteria();
        transactionTypeCriteria.setIsActive(booleanFilterTrue);
        transactionTypeCriteria.setId(longFilterTransactionId);
        List<TransactionType> transactionType = transactionTypeQueryService.findByCriteria(transactionTypeCriteria);

        //Check if TransactionType is Empty or have multiple entries
        assert (transactionType.isEmpty());
        assert (transactionType.size() != 1);


        if(userService.getExUser().isPresent()){
            exUser = userService.getExUser().get();
            assert (exUser != null);
        }
        //Check if the user had Location access - for extra security
        if(exUser != null && exUser.getLocations().contains(goodsReceipt.getLocation())){

            DocumentHistory documentHistory = new DocumentHistory();
            documentHistory.setHistoryDate(java.time.LocalDate.now());
            documentHistory.setHistoryDescription("Create GRN - " + goodsReceipt.getGrnNumber());
            documentHistory.setUser(exUser);
            documentHistory.setType(DocumentConstants.GRN());
            goodsReceipt.setHistory(documentHistory);

            savedGoodsReceipt = goodsReceiptRepository.save(goodsReceipt);
            BigDecimal totalAmount = BigDecimal.ZERO;
            for (GoodsReceiptDetails details : goodsReceipt.getDetails()) {
                if(details != null){
                    GoodsReceiptDetails savedGoodsReceiptDetails = null;
                    details.setGrn(savedGoodsReceipt);
                    savedGoodsReceiptDetails = goodsReceiptDetailsRepository.save(details);

                    //Set Amounts
                    //BigDecimal itemCost = (BigDecimal.ZERO.compareTo(savedGoodsReceiptDetails.getRevisedItemCost()) == 0) ? savedGoodsReceiptDetails.getRevisedItemCost() : savedGoodsReceiptDetails.getItem().getItemCost() ;
                    BigDecimal itemCost = (savedGoodsReceiptDetails.getRevisedItemCost() != null) ? savedGoodsReceiptDetails.getRevisedItemCost() : savedGoodsReceiptDetails.getItem().getItemCost() ;
                    totalAmount = totalAmount.add(itemCost.multiply(new BigDecimal(savedGoodsReceiptDetails.getGrnQty())));

                    //Setting Filter
                    longFilterCompanyId.setEquals(exUser.getCompany().getId());
                    longFilterLocationId.setEquals(savedGoodsReceipt.getLocation().getId());
                    longFilterItemId.setEquals(savedGoodsReceiptDetails.getItem().getId());
                    longFilterSupplierId .setEquals(savedGoodsReceipt.getSupplier().getId());

                    //getCurrent Stock
                    StockCriteria stockCriteria = new StockCriteria();
                    stockCriteria.setCompanyId(longFilterCompanyId);
                    stockCriteria.setLocationId(longFilterLocationId);
                    stockCriteria.setItemId(longFilterItemId);
                    List<Stock> StockItemList = stockQueryService.findByCriteria(stockCriteria);

                    //Check if StockItem is Empty or have multiple entries
                    assert (StockItemList.isEmpty());
                    assert (StockItemList.size() != 1);

                    //Get Stock
                    Stock stock = StockItemList.get(0);

                    //Update Stock
                    stock.addStockQty(savedGoodsReceiptDetails.getGrnQty());
                    stock.setHistory(documentHistory);
                    stockService.save(stock);

                    //Update ItemBin Card
                    ItemBinCard itemBinCard = new ItemBinCard();
                    itemBinCard.setItem(savedGoodsReceiptDetails.getItem());
                    itemBinCard.setLocation(savedGoodsReceipt.getLocation());
                    //If user level is Admin, allow user to override the date if not set current date/time
                    itemBinCard.setTransactionDate(SecurityUtils.isCurrentUserInRole(ADMIN) ? savedGoodsReceipt.getGrnDate() : java.time.LocalDate.now());
                    itemBinCard.setTransactionQty(savedGoodsReceiptDetails.getGrnQty());
                    itemBinCard.setTransactionDescription("Goods Receipt : " + savedGoodsReceipt.getGrnNumber() + " @ " + itemCost + " by " + exUser.getUserKey());
                    itemBinCard.setTransactionBalance(new BigDecimal(stock.getStockQty()));
                    itemBinCard.setHistory(documentHistory);
                    itemBinCardService.save(itemBinCard);

                }
            }

            //getCurrent Purchase Balance
            PurchaseAccountBalanceCriteria purchaseAccountBalanceCriteria = new PurchaseAccountBalanceCriteria();
            purchaseAccountBalanceCriteria.setLocationId(longFilterLocationId);
            List<PurchaseAccountBalance> purchaseAccountBalanceList= purchaseAccountBalanceQueryService.findByCriteria(purchaseAccountBalanceCriteria);

            //Check if PurchaseAccountBalance is Empty or have multiple entries
            assert (purchaseAccountBalanceList.isEmpty());
            assert (purchaseAccountBalanceList.size() != 1);

            //get Purchase Account Balance
            PurchaseAccountBalance purchaseAccountBalance = purchaseAccountBalanceList.get(0);

            //Update Purchase Account Balance
            purchaseAccountBalance.addBalance(totalAmount);
            purchaseAccountBalanceService.save(purchaseAccountBalance);

            //Update Purchase Account
            PurchaseAccount purchaseAccount = new PurchaseAccount();
            purchaseAccount.setLocation(savedGoodsReceipt.getLocation());
            purchaseAccount.setTransactionDate(SecurityUtils.isCurrentUserInRole(ADMIN) ? savedGoodsReceipt.getGrnDate() : java.time.LocalDate.now());
            purchaseAccount.setTransactionAmountCR(BigDecimal.ZERO);
            purchaseAccount.setTransactionAmountDR(totalAmount);
            purchaseAccount.setTransactionDescription("Purchase : " + savedGoodsReceipt.getGrnNumber());
            purchaseAccount.setTransactionBalance(purchaseAccountBalance.getBalance());
            purchaseAccount.setTransactionType(transactionType.get(0));
            purchaseAccount.setHistory(documentHistory);
            purchaseAccountService.save(purchaseAccount);

            //get Supplier Balance
            SupplierAccountBalanceCriteria supplierAccountBalanceCriteria = new SupplierAccountBalanceCriteria();
            supplierAccountBalanceCriteria.setLocationId(longFilterLocationId);
            supplierAccountBalanceCriteria.setTransactionTypeId(longFilterTransactionId);
            supplierAccountBalanceCriteria.setSupplierId(longFilterSupplierId);
            List<SupplierAccountBalance> supplierAccountBalanceList = supplierAccountBalanceQueryService.findByCriteria(supplierAccountBalanceCriteria);

            //Check if SupplierAccountBalance is Empty or have multiple entries
            assert (supplierAccountBalanceList.isEmpty());
            assert (supplierAccountBalanceList.size() != 1);

            //get Supplier Account Balance
            SupplierAccountBalance supplierAccountBalance = supplierAccountBalanceList.get(0);

            //Update Supplier Account balance
            supplierAccountBalance.addBalance(totalAmount);
            supplierAccountBalanceService.save(supplierAccountBalance);

            //Update Supplier Account
            SupplierAccount supplierAccount = new SupplierAccount();
            supplierAccount.setSupplier(savedGoodsReceipt.getSupplier());
            supplierAccount.setLocation(savedGoodsReceipt.getLocation());
            supplierAccount.setTransactionDate(SecurityUtils.isCurrentUserInRole(ADMIN) ? savedGoodsReceipt.getGrnDate() : java.time.LocalDate.now());
            supplierAccount.setTransactionAmountCR(totalAmount);
            supplierAccount.setTransactionAmountDR(BigDecimal.ZERO);
            supplierAccount.setTransactionDescription("Purchase : " + savedGoodsReceipt.getGrnNumber());
            supplierAccount.setTransactionBalance(supplierAccountBalance.getBalance());
            supplierAccount.setTransactionType(transactionType.get(0));
            supplierAccount.setHistory(documentHistory);
            supplierAccountService.save(supplierAccount);

        }else{
            //Capture Generically Fix-me to capture each scenario
            log.error("User Permission Error / Location Not mapped");
        }

        return savedGoodsReceipt;
    }

    /**
     * Get all the goodsReceipts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<GoodsReceipt> findAll(Pageable pageable) {
        log.debug("Request to get all GoodsReceipts");
        return goodsReceiptRepository.findAll(pageable);
    }


    /**
     * Get one goodsReceipt by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<GoodsReceipt> findOne(Long id) {
        log.debug("Request to get GoodsReceipt : {}", id);
        return goodsReceiptRepository.findById(id);
    }

    /**
     * Delete the goodsReceipt by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete GoodsReceipt : {}", id);
        goodsReceiptRepository.deleteById(id);
    }
}
