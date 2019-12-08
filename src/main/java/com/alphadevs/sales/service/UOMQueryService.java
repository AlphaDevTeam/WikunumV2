package com.alphadevs.sales.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.alphadevs.sales.domain.UOM;
import com.alphadevs.sales.domain.*; // for static metamodels
import com.alphadevs.sales.repository.UOMRepository;
import com.alphadevs.sales.service.dto.UOMCriteria;

/**
 * Service for executing complex queries for {@link UOM} entities in the database.
 * The main input is a {@link UOMCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link UOM} or a {@link Page} of {@link UOM} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UOMQueryService extends QueryService<UOM> {

    private final Logger log = LoggerFactory.getLogger(UOMQueryService.class);

    private final UOMRepository uOMRepository;

    public UOMQueryService(UOMRepository uOMRepository) {
        this.uOMRepository = uOMRepository;
    }

    /**
     * Return a {@link List} of {@link UOM} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<UOM> findByCriteria(UOMCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<UOM> specification = createSpecification(criteria);
        return uOMRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link UOM} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<UOM> findByCriteria(UOMCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<UOM> specification = createSpecification(criteria);
        return uOMRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(UOMCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<UOM> specification = createSpecification(criteria);
        return uOMRepository.count(specification);
    }

    /**
     * Function to convert {@link UOMCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<UOM> createSpecification(UOMCriteria criteria) {
        Specification<UOM> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), UOM_.id));
            }
            if (criteria.getUomCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUomCode(), UOM_.uomCode));
            }
            if (criteria.getUomDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUomDescription(), UOM_.uomDescription));
            }
            if (criteria.getHistoryId() != null) {
                specification = specification.and(buildSpecification(criteria.getHistoryId(),
                    root -> root.join(UOM_.history, JoinType.LEFT).get(DocumentHistory_.id)));
            }
        }
        return specification;
    }
}
