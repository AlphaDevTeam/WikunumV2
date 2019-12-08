package com.alphadevs.sales.service;

import com.alphadevs.sales.domain.UOM;
import com.alphadevs.sales.repository.UOMRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link UOM}.
 */
@Service
@Transactional
public class UOMService {

    private final Logger log = LoggerFactory.getLogger(UOMService.class);

    private final UOMRepository uOMRepository;

    public UOMService(UOMRepository uOMRepository) {
        this.uOMRepository = uOMRepository;
    }

    /**
     * Save a uOM.
     *
     * @param uOM the entity to save.
     * @return the persisted entity.
     */
    public UOM save(UOM uOM) {
        log.debug("Request to save UOM : {}", uOM);
        return uOMRepository.save(uOM);
    }

    /**
     * Get all the uOMS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<UOM> findAll(Pageable pageable) {
        log.debug("Request to get all UOMS");
        return uOMRepository.findAll(pageable);
    }


    /**
     * Get one uOM by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UOM> findOne(Long id) {
        log.debug("Request to get UOM : {}", id);
        return uOMRepository.findById(id);
    }

    /**
     * Delete the uOM by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UOM : {}", id);
        uOMRepository.deleteById(id);
    }
}
