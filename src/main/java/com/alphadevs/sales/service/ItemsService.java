package com.alphadevs.sales.service;

import com.alphadevs.sales.domain.ExUser;
import com.alphadevs.sales.domain.Items;
import com.alphadevs.sales.domain.Stock;
import com.alphadevs.sales.domain.TransactionType;
import com.alphadevs.sales.repository.ItemsRepository;
import com.alphadevs.sales.service.dto.TransactionTypeCriteria;
import io.github.jhipster.service.filter.BooleanFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Items}.
 */
@Service
@Transactional
public class ItemsService {

    private final Logger log = LoggerFactory.getLogger(ItemsService.class);

    private final ItemsRepository itemsRepository;
    private final UserService userService;
    private final TransactionTypeQueryService transactionTypeQueryService;
    private final StockService stockService;

    public ItemsService(ItemsRepository itemsRepository, UserService userService, TransactionTypeQueryService transactionTypeQueryService, StockService stockService) {
        this.itemsRepository = itemsRepository;
        this.userService = userService;
        this.transactionTypeQueryService = transactionTypeQueryService;
        this.stockService = stockService;
    }

    /**
     * Save a items.
     *
     * @param items the entity to save.
     * @return the persisted entity.
     */
    public Items save(Items items) {
        log.debug("Request to save Items : {}", items);

        //get ExUser
        ExUser exUser = null;
        Items savedItem = new Items();


        if(userService.getExUser().isPresent()){
            exUser = userService.getExUser().get();
            assert (exUser != null);
        }

        if(exUser != null && exUser.getLocations().contains(items.getLocation())){

            //save Item
            savedItem = itemsRepository.save(items);

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
                Stock stock = new Stock();
                stock.setStockQty(0.0);
                stock.setLocation(savedItem.getLocation());
                stock.setItem(savedItem);
                stock.setCompany(exUser.getCompany());
                stockService.save(stock);
            }
        }
        return savedItem;
    }

    /**
     * Get all the items.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Items> findAll(Pageable pageable) {
        log.debug("Request to get all Items");
        return itemsRepository.findAll(pageable);
    }

    /**
     * Get all the items with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Items> findAllWithEagerRelationships(Pageable pageable) {
        return itemsRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one items by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Items> findOne(Long id) {
        log.debug("Request to get Items : {}", id);
        return itemsRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the items by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Items : {}", id);
        itemsRepository.deleteById(id);
    }
}
