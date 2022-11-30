package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.WikunumV2App;
import com.alphadevs.sales.domain.UOM;
import com.alphadevs.sales.domain.DocumentHistory;
import com.alphadevs.sales.repository.UOMRepository;
import com.alphadevs.sales.service.UOMService;
import com.alphadevs.sales.web.rest.errors.ExceptionTranslator;
import com.alphadevs.sales.service.dto.UOMCriteria;
import com.alphadevs.sales.service.UOMQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.alphadevs.sales.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UOMResource} REST controller.
 */
@SpringBootTest(classes = WikunumV2App.class)
public class UOMResourceIT {

    private static final String DEFAULT_UOM_CODE = "AAAAAAAAAA";
    private static final String UPDATED_UOM_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_UOM_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_UOM_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private UOMRepository uOMRepository;

    @Autowired
    private UOMService uOMService;

    @Autowired
    private UOMQueryService uOMQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUOMMockMvc;

    private UOM uOM;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UOMResource uOMResource = new UOMResource(uOMService, uOMQueryService);
        this.restUOMMockMvc = MockMvcBuilders.standaloneSetup(uOMResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UOM createEntity(EntityManager em) {
        UOM uOM = new UOM()
            .uomCode(DEFAULT_UOM_CODE)
            .uomDescription(DEFAULT_UOM_DESCRIPTION);
        return uOM;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UOM createUpdatedEntity(EntityManager em) {
        UOM uOM = new UOM()
            .uomCode(UPDATED_UOM_CODE)
            .uomDescription(UPDATED_UOM_DESCRIPTION);
        return uOM;
    }

    @BeforeEach
    public void initTest() {
        uOM = createEntity(em);
    }

    @Test
    @Transactional
    public void createUOM() throws Exception {
        int databaseSizeBeforeCreate = uOMRepository.findAll().size();

        // Create the UOM
        restUOMMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uOM)))
            .andExpect(status().isCreated());

        // Validate the UOM in the database
        List<UOM> uOMList = uOMRepository.findAll();
        assertThat(uOMList).hasSize(databaseSizeBeforeCreate + 1);
        UOM testUOM = uOMList.get(uOMList.size() - 1);
        assertThat(testUOM.getUomCode()).isEqualTo(DEFAULT_UOM_CODE);
        assertThat(testUOM.getUomDescription()).isEqualTo(DEFAULT_UOM_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createUOMWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uOMRepository.findAll().size();

        // Create the UOM with an existing ID
        uOM.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUOMMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uOM)))
            .andExpect(status().isBadRequest());

        // Validate the UOM in the database
        List<UOM> uOMList = uOMRepository.findAll();
        assertThat(uOMList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUomCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = uOMRepository.findAll().size();
        // set the field null
        uOM.setUomCode(null);

        // Create the UOM, which fails.

        restUOMMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uOM)))
            .andExpect(status().isBadRequest());

        List<UOM> uOMList = uOMRepository.findAll();
        assertThat(uOMList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUomDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = uOMRepository.findAll().size();
        // set the field null
        uOM.setUomDescription(null);

        // Create the UOM, which fails.

        restUOMMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uOM)))
            .andExpect(status().isBadRequest());

        List<UOM> uOMList = uOMRepository.findAll();
        assertThat(uOMList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUOMS() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList
        restUOMMockMvc.perform(get("/api/uoms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uOM.getId().intValue())))
            .andExpect(jsonPath("$.[*].uomCode").value(hasItem(DEFAULT_UOM_CODE)))
            .andExpect(jsonPath("$.[*].uomDescription").value(hasItem(DEFAULT_UOM_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getUOM() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get the uOM
        restUOMMockMvc.perform(get("/api/uoms/{id}", uOM.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(uOM.getId().intValue()))
            .andExpect(jsonPath("$.uomCode").value(DEFAULT_UOM_CODE))
            .andExpect(jsonPath("$.uomDescription").value(DEFAULT_UOM_DESCRIPTION));
    }


    @Test
    @Transactional
    public void getUOMSByIdFiltering() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        Long id = uOM.getId();

        defaultUOMShouldBeFound("id.equals=" + id);
        defaultUOMShouldNotBeFound("id.notEquals=" + id);

        defaultUOMShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultUOMShouldNotBeFound("id.greaterThan=" + id);

        defaultUOMShouldBeFound("id.lessThanOrEqual=" + id);
        defaultUOMShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllUOMSByUomCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomCode equals to DEFAULT_UOM_CODE
        defaultUOMShouldBeFound("uomCode.equals=" + DEFAULT_UOM_CODE);

        // Get all the uOMList where uomCode equals to UPDATED_UOM_CODE
        defaultUOMShouldNotBeFound("uomCode.equals=" + UPDATED_UOM_CODE);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomCodeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomCode not equals to DEFAULT_UOM_CODE
        defaultUOMShouldNotBeFound("uomCode.notEquals=" + DEFAULT_UOM_CODE);

        // Get all the uOMList where uomCode not equals to UPDATED_UOM_CODE
        defaultUOMShouldBeFound("uomCode.notEquals=" + UPDATED_UOM_CODE);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomCodeIsInShouldWork() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomCode in DEFAULT_UOM_CODE or UPDATED_UOM_CODE
        defaultUOMShouldBeFound("uomCode.in=" + DEFAULT_UOM_CODE + "," + UPDATED_UOM_CODE);

        // Get all the uOMList where uomCode equals to UPDATED_UOM_CODE
        defaultUOMShouldNotBeFound("uomCode.in=" + UPDATED_UOM_CODE);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomCode is not null
        defaultUOMShouldBeFound("uomCode.specified=true");

        // Get all the uOMList where uomCode is null
        defaultUOMShouldNotBeFound("uomCode.specified=false");
    }
                @Test
    @Transactional
    public void getAllUOMSByUomCodeContainsSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomCode contains DEFAULT_UOM_CODE
        defaultUOMShouldBeFound("uomCode.contains=" + DEFAULT_UOM_CODE);

        // Get all the uOMList where uomCode contains UPDATED_UOM_CODE
        defaultUOMShouldNotBeFound("uomCode.contains=" + UPDATED_UOM_CODE);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomCodeNotContainsSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomCode does not contain DEFAULT_UOM_CODE
        defaultUOMShouldNotBeFound("uomCode.doesNotContain=" + DEFAULT_UOM_CODE);

        // Get all the uOMList where uomCode does not contain UPDATED_UOM_CODE
        defaultUOMShouldBeFound("uomCode.doesNotContain=" + UPDATED_UOM_CODE);
    }


    @Test
    @Transactional
    public void getAllUOMSByUomDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomDescription equals to DEFAULT_UOM_DESCRIPTION
        defaultUOMShouldBeFound("uomDescription.equals=" + DEFAULT_UOM_DESCRIPTION);

        // Get all the uOMList where uomDescription equals to UPDATED_UOM_DESCRIPTION
        defaultUOMShouldNotBeFound("uomDescription.equals=" + UPDATED_UOM_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomDescriptionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomDescription not equals to DEFAULT_UOM_DESCRIPTION
        defaultUOMShouldNotBeFound("uomDescription.notEquals=" + DEFAULT_UOM_DESCRIPTION);

        // Get all the uOMList where uomDescription not equals to UPDATED_UOM_DESCRIPTION
        defaultUOMShouldBeFound("uomDescription.notEquals=" + UPDATED_UOM_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomDescription in DEFAULT_UOM_DESCRIPTION or UPDATED_UOM_DESCRIPTION
        defaultUOMShouldBeFound("uomDescription.in=" + DEFAULT_UOM_DESCRIPTION + "," + UPDATED_UOM_DESCRIPTION);

        // Get all the uOMList where uomDescription equals to UPDATED_UOM_DESCRIPTION
        defaultUOMShouldNotBeFound("uomDescription.in=" + UPDATED_UOM_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomDescription is not null
        defaultUOMShouldBeFound("uomDescription.specified=true");

        // Get all the uOMList where uomDescription is null
        defaultUOMShouldNotBeFound("uomDescription.specified=false");
    }
                @Test
    @Transactional
    public void getAllUOMSByUomDescriptionContainsSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomDescription contains DEFAULT_UOM_DESCRIPTION
        defaultUOMShouldBeFound("uomDescription.contains=" + DEFAULT_UOM_DESCRIPTION);

        // Get all the uOMList where uomDescription contains UPDATED_UOM_DESCRIPTION
        defaultUOMShouldNotBeFound("uomDescription.contains=" + UPDATED_UOM_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllUOMSByUomDescriptionNotContainsSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);

        // Get all the uOMList where uomDescription does not contain DEFAULT_UOM_DESCRIPTION
        defaultUOMShouldNotBeFound("uomDescription.doesNotContain=" + DEFAULT_UOM_DESCRIPTION);

        // Get all the uOMList where uomDescription does not contain UPDATED_UOM_DESCRIPTION
        defaultUOMShouldBeFound("uomDescription.doesNotContain=" + UPDATED_UOM_DESCRIPTION);
    }


    @Test
    @Transactional
    public void getAllUOMSByHistoryIsEqualToSomething() throws Exception {
        // Initialize the database
        uOMRepository.saveAndFlush(uOM);
        DocumentHistory history = DocumentHistoryResourceIT.createEntity(em);
        em.persist(history);
        em.flush();
        uOM.setHistory(history);
        uOMRepository.saveAndFlush(uOM);
        Long historyId = history.getId();

        // Get all the uOMList where history equals to historyId
        defaultUOMShouldBeFound("historyId.equals=" + historyId);

        // Get all the uOMList where history equals to historyId + 1
        defaultUOMShouldNotBeFound("historyId.equals=" + (historyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultUOMShouldBeFound(String filter) throws Exception {
        restUOMMockMvc.perform(get("/api/uoms?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uOM.getId().intValue())))
            .andExpect(jsonPath("$.[*].uomCode").value(hasItem(DEFAULT_UOM_CODE)))
            .andExpect(jsonPath("$.[*].uomDescription").value(hasItem(DEFAULT_UOM_DESCRIPTION)));

        // Check, that the count call also returns 1
        restUOMMockMvc.perform(get("/api/uoms/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultUOMShouldNotBeFound(String filter) throws Exception {
        restUOMMockMvc.perform(get("/api/uoms?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restUOMMockMvc.perform(get("/api/uoms/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingUOM() throws Exception {
        // Get the uOM
        restUOMMockMvc.perform(get("/api/uoms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUOM() throws Exception {
        // Initialize the database
        uOMService.save(uOM);

        int databaseSizeBeforeUpdate = uOMRepository.findAll().size();

        // Update the uOM
        UOM updatedUOM = uOMRepository.findById(uOM.getId()).get();
        // Disconnect from session so that the updates on updatedUOM are not directly saved in db
        em.detach(updatedUOM);
        updatedUOM
            .uomCode(UPDATED_UOM_CODE)
            .uomDescription(UPDATED_UOM_DESCRIPTION);

        restUOMMockMvc.perform(put("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUOM)))
            .andExpect(status().isOk());

        // Validate the UOM in the database
        List<UOM> uOMList = uOMRepository.findAll();
        assertThat(uOMList).hasSize(databaseSizeBeforeUpdate);
        UOM testUOM = uOMList.get(uOMList.size() - 1);
        assertThat(testUOM.getUomCode()).isEqualTo(UPDATED_UOM_CODE);
        assertThat(testUOM.getUomDescription()).isEqualTo(UPDATED_UOM_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingUOM() throws Exception {
        int databaseSizeBeforeUpdate = uOMRepository.findAll().size();

        // Create the UOM

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUOMMockMvc.perform(put("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uOM)))
            .andExpect(status().isBadRequest());

        // Validate the UOM in the database
        List<UOM> uOMList = uOMRepository.findAll();
        assertThat(uOMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUOM() throws Exception {
        // Initialize the database
        uOMService.save(uOM);

        int databaseSizeBeforeDelete = uOMRepository.findAll().size();

        // Delete the uOM
        restUOMMockMvc.perform(delete("/api/uoms/{id}", uOM.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UOM> uOMList = uOMRepository.findAll();
        assertThat(uOMList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
