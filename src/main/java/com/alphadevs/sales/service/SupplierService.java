package com.alphadevs.sales.service;

import com.alphadevs.sales.domain.ExUser;
import com.alphadevs.sales.domain.Supplier;
import com.alphadevs.sales.domain.SupplierAccountBalance;
import com.alphadevs.sales.domain.TransactionType;
import com.alphadevs.sales.repository.SupplierRepository;
import com.alphadevs.sales.service.dto.TransactionTypeCriteria;
import io.github.jhipster.service.filter.BooleanFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Supplier}.
 */
@Service
@Transactional
public class SupplierService {

    private final Logger log = LoggerFactory.getLogger(SupplierService.class);

    private final SupplierRepository supplierRepository;
    private final UserService userService;
    private final TransactionTypeQueryService transactionTypeQueryService;
    private  final SupplierAccountBalanceService supplierAccountBalanceService;

    public SupplierService(SupplierRepository supplierRepository, UserService userService, TransactionTypeQueryService transactionTypeQueryService, SupplierAccountBalanceService supplierAccountBalanceService) {
        this.supplierRepository = supplierRepository;
        this.userService = userService;
        this.transactionTypeQueryService = transactionTypeQueryService;
        this.supplierAccountBalanceService = supplierAccountBalanceService;
    }

    /**
     * Save a supplier.
     *
     * @param supplier the entity to save.
     * @return the persisted entity.
     */
    public Supplier save(Supplier supplier) {
        log.debug("Request to save Supplier : {}", supplier);

        //get ExUser
        ExUser exUser = null;
        Supplier savedSupplier = new Supplier();


        if(userService.getExUser().isPresent()){
            exUser = userService.getExUser().get();
            assert (exUser != null);
        }

        if(exUser != null && exUser.getLocations().contains(supplier.getLocation())){

            //save Supplier
            savedSupplier = supplierRepository.save(supplier);

            //Filter setting
            BooleanFilter booleanFilterTrue = new BooleanFilter();
            booleanFilterTrue.setEquals(true);

            //get Available Transaction Types
            TransactionTypeCriteria transactionTypeCriteria = new TransactionTypeCriteria();
            transactionTypeCriteria.setIsActive(booleanFilterTrue);
            List<TransactionType> transactionTypeList = transactionTypeQueryService.findByCriteria(transactionTypeCriteria);

            //Check if TransactionType is Empty or have multiple entries
            assert (transactionTypeList.isEmpty());
            assert (transactionTypeList.size() != 1);

            for (TransactionType transactionType: transactionTypeList) {
                SupplierAccountBalance supplierAccountBalance = new SupplierAccountBalance();
                supplierAccountBalance.setBalance(BigDecimal.ZERO);
                supplierAccountBalance.setLocation(savedSupplier.getLocation());
                supplierAccountBalance.setSupplier(savedSupplier);
                supplierAccountBalance.setTransactionType(transactionType);
                supplierAccountBalanceService.save(supplierAccountBalance);
            }
        }
        return savedSupplier;
    }

    /**
     * Get all the suppliers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Supplier> findAll(Pageable pageable) {
        log.debug("Request to get all Suppliers");
        return supplierRepository.findAll(pageable);
    }


    /**
     * Get one supplier by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Supplier> findOne(Long id) {
        log.debug("Request to get Supplier : {}", id);
        return supplierRepository.findById(id);
    }

    /**
     * Delete the supplier by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Supplier : {}", id);
        supplierRepository.deleteById(id);
    }
}
