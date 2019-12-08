package com.alphadevs.sales.service;

import com.alphadevs.sales.domain.Designs;
import com.alphadevs.sales.repository.DesignsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Designs}.
 */
@Service
@Transactional
public class DesignsService {

    private final Logger log = LoggerFactory.getLogger(DesignsService.class);

    private final DesignsRepository designsRepository;

    public DesignsService(DesignsRepository designsRepository) {
        this.designsRepository = designsRepository;
    }

    /**
     * Save a designs.
     *
     * @param designs the entity to save.
     * @return the persisted entity.
     */
    public Designs save(Designs designs) {
        log.debug("Request to save Designs : {}", designs);
        return designsRepository.save(designs);
    }

    /**
     * Get all the designs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Designs> findAll(Pageable pageable) {
        log.debug("Request to get all Designs");
        return designsRepository.findAll(pageable);
    }


    /**
     * Get one designs by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Designs> findOne(Long id) {
        log.debug("Request to get Designs : {}", id);
        return designsRepository.findById(id);
    }

    /**
     * Delete the designs by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Designs : {}", id);
        designsRepository.deleteById(id);
    }
}
