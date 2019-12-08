package com.alphadevs.sales.service;

import com.alphadevs.sales.domain.*;
import com.alphadevs.sales.repository.LocationRepository;
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
 * Service Implementation for managing {@link Location}.
 */
@Service
@Transactional
public class LocationService {

    private final Logger log = LoggerFactory.getLogger(LocationService.class);

    private final LocationRepository locationRepository;
    private final TransactionTypeQueryService transactionTypeQueryService;
    private final PurchaseAccountBalanceService purchaseAccountBalanceService;
    private final CashBookBalanceService cashBookBalanceService;
    private final UserService userService;

    public LocationService(LocationRepository locationRepository, TransactionTypeQueryService transactionTypeQueryService, PurchaseAccountBalanceService purchaseAccountBalanceService, CashBookBalanceService cashBookBalanceService, UserService userService) {
        this.locationRepository = locationRepository;
        this.transactionTypeQueryService = transactionTypeQueryService;
        this.purchaseAccountBalanceService = purchaseAccountBalanceService;
        this.cashBookBalanceService = cashBookBalanceService;
        this.userService = userService;
    }

    /**
     * Save a location.
     *
     * @param location the entity to save.
     * @return the persisted entity.
     */
    public Location save(Location location) {
        log.debug("Request to save Location : {}", location);

        //Save Location
        Location savedLocation = locationRepository.save(location);

        //get ExUser
        ExUser exUser = null;

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


        if(userService.getExUser().isPresent()){
            exUser = userService.getExUser().get();
            assert (exUser != null);
        }

        for (TransactionType transactionType: transactionTypeList) {
            PurchaseAccountBalance purchaseAccountBalance = new PurchaseAccountBalance();
            purchaseAccountBalance.setTransactionType(transactionType);
            purchaseAccountBalance.setLocation(savedLocation);
            purchaseAccountBalance.setBalance(BigDecimal.ZERO);
            purchaseAccountBalanceService.save(purchaseAccountBalance);

            CashBookBalance cashBookBalance = new CashBookBalance();
            cashBookBalance.setTransactionType(transactionType);
            cashBookBalance.setLocation(savedLocation);
            cashBookBalance.setBalance(BigDecimal.ZERO);
            cashBookBalanceService.save(cashBookBalance);
        }
        return savedLocation ;
    }

    /**
     * Get all the locations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Location> findAll(Pageable pageable) {
        log.debug("Request to get all Locations");
        return locationRepository.findAll(pageable);
    }


    /**
     * Get one location by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Location> findOne(Long id) {
        log.debug("Request to get Location : {}", id);
        return locationRepository.findById(id);
    }

    /**
     * Delete the location by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Location : {}", id);
        locationRepository.deleteById(id);
    }
}
