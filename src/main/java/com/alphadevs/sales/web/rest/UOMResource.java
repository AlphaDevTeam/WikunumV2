package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.domain.UOM;
import com.alphadevs.sales.service.UOMService;
import com.alphadevs.sales.web.rest.errors.BadRequestAlertException;
import com.alphadevs.sales.service.dto.UOMCriteria;
import com.alphadevs.sales.service.UOMQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.alphadevs.sales.domain.UOM}.
 */
@RestController
@RequestMapping("/api")
public class UOMResource {

    private final Logger log = LoggerFactory.getLogger(UOMResource.class);

    private static final String ENTITY_NAME = "uOM";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UOMService uOMService;

    private final UOMQueryService uOMQueryService;

    public UOMResource(UOMService uOMService, UOMQueryService uOMQueryService) {
        this.uOMService = uOMService;
        this.uOMQueryService = uOMQueryService;
    }

    /**
     * {@code POST  /uoms} : Create a new uOM.
     *
     * @param uOM the uOM to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new uOM, or with status {@code 400 (Bad Request)} if the uOM has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/uoms")
    public ResponseEntity<UOM> createUOM(@Valid @RequestBody UOM uOM) throws URISyntaxException {
        log.debug("REST request to save UOM : {}", uOM);
        if (uOM.getId() != null) {
            throw new BadRequestAlertException("A new uOM cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UOM result = uOMService.save(uOM);
        return ResponseEntity.created(new URI("/api/uoms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /uoms} : Updates an existing uOM.
     *
     * @param uOM the uOM to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated uOM,
     * or with status {@code 400 (Bad Request)} if the uOM is not valid,
     * or with status {@code 500 (Internal Server Error)} if the uOM couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/uoms")
    public ResponseEntity<UOM> updateUOM(@Valid @RequestBody UOM uOM) throws URISyntaxException {
        log.debug("REST request to update UOM : {}", uOM);
        if (uOM.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UOM result = uOMService.save(uOM);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, uOM.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /uoms} : get all the uOMS.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of uOMS in body.
     */
    @GetMapping("/uoms")
    public ResponseEntity<List<UOM>> getAllUOMS(UOMCriteria criteria, Pageable pageable) {
        log.debug("REST request to get UOMS by criteria: {}", criteria);
        Page<UOM> page = uOMQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /uoms/count} : count all the uOMS.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/uoms/count")
    public ResponseEntity<Long> countUOMS(UOMCriteria criteria) {
        log.debug("REST request to count UOMS by criteria: {}", criteria);
        return ResponseEntity.ok().body(uOMQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /uoms/:id} : get the "id" uOM.
     *
     * @param id the id of the uOM to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the uOM, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/uoms/{id}")
    public ResponseEntity<UOM> getUOM(@PathVariable Long id) {
        log.debug("REST request to get UOM : {}", id);
        Optional<UOM> uOM = uOMService.findOne(id);
        return ResponseUtil.wrapOrNotFound(uOM);
    }

    /**
     * {@code DELETE  /uoms/:id} : delete the "id" uOM.
     *
     * @param id the id of the uOM to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/uoms/{id}")
    public ResponseEntity<Void> deleteUOM(@PathVariable Long id) {
        log.debug("REST request to delete UOM : {}", id);
        uOMService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
