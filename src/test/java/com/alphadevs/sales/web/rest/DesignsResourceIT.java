package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.WikunumV2App;
import com.alphadevs.sales.domain.Designs;
import com.alphadevs.sales.domain.Products;
import com.alphadevs.sales.domain.Location;
import com.alphadevs.sales.domain.DocumentHistory;
import com.alphadevs.sales.repository.DesignsRepository;
import com.alphadevs.sales.service.DesignsService;
import com.alphadevs.sales.web.rest.errors.ExceptionTranslator;
import com.alphadevs.sales.service.dto.DesignsCriteria;
import com.alphadevs.sales.service.DesignsQueryService;

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
 * Integration tests for the {@link DesignsResource} REST controller.
 */
@SpringBootTest(classes = WikunumV2App.class)
public class DesignsResourceIT {

    private static final String DEFAULT_DESIGN_CODE = "AAAAAAAAAA";
    private static final String UPDATED_DESIGN_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DESIGN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGN_PREFIX = "AAAAAAAAAA";
    private static final String UPDATED_DESIGN_PREFIX = "BBBBBBBBBB";

    @Autowired
    private DesignsRepository designsRepository;

    @Autowired
    private DesignsService designsService;

    @Autowired
    private DesignsQueryService designsQueryService;

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

    private MockMvc restDesignsMockMvc;

    private Designs designs;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DesignsResource designsResource = new DesignsResource(designsService, designsQueryService);
        this.restDesignsMockMvc = MockMvcBuilders.standaloneSetup(designsResource)
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
    public static Designs createEntity(EntityManager em) {
        Designs designs = new Designs()
            .designCode(DEFAULT_DESIGN_CODE)
            .designName(DEFAULT_DESIGN_NAME)
            .designPrefix(DEFAULT_DESIGN_PREFIX);
        // Add required entity
        Products products;
        if (TestUtil.findAll(em, Products.class).isEmpty()) {
            products = ProductsResourceIT.createEntity(em);
            em.persist(products);
            em.flush();
        } else {
            products = TestUtil.findAll(em, Products.class).get(0);
        }
        designs.setRelatedProduct(products);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        designs.setLocation(location);
        return designs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Designs createUpdatedEntity(EntityManager em) {
        Designs designs = new Designs()
            .designCode(UPDATED_DESIGN_CODE)
            .designName(UPDATED_DESIGN_NAME)
            .designPrefix(UPDATED_DESIGN_PREFIX);
        // Add required entity
        Products products;
        if (TestUtil.findAll(em, Products.class).isEmpty()) {
            products = ProductsResourceIT.createUpdatedEntity(em);
            em.persist(products);
            em.flush();
        } else {
            products = TestUtil.findAll(em, Products.class).get(0);
        }
        designs.setRelatedProduct(products);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createUpdatedEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        designs.setLocation(location);
        return designs;
    }

    @BeforeEach
    public void initTest() {
        designs = createEntity(em);
    }

    @Test
    @Transactional
    public void createDesigns() throws Exception {
        int databaseSizeBeforeCreate = designsRepository.findAll().size();

        // Create the Designs
        restDesignsMockMvc.perform(post("/api/designs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(designs)))
            .andExpect(status().isCreated());

        // Validate the Designs in the database
        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeCreate + 1);
        Designs testDesigns = designsList.get(designsList.size() - 1);
        assertThat(testDesigns.getDesignCode()).isEqualTo(DEFAULT_DESIGN_CODE);
        assertThat(testDesigns.getDesignName()).isEqualTo(DEFAULT_DESIGN_NAME);
        assertThat(testDesigns.getDesignPrefix()).isEqualTo(DEFAULT_DESIGN_PREFIX);
    }

    @Test
    @Transactional
    public void createDesignsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = designsRepository.findAll().size();

        // Create the Designs with an existing ID
        designs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDesignsMockMvc.perform(post("/api/designs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(designs)))
            .andExpect(status().isBadRequest());

        // Validate the Designs in the database
        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDesignCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = designsRepository.findAll().size();
        // set the field null
        designs.setDesignCode(null);

        // Create the Designs, which fails.

        restDesignsMockMvc.perform(post("/api/designs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(designs)))
            .andExpect(status().isBadRequest());

        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDesignNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = designsRepository.findAll().size();
        // set the field null
        designs.setDesignName(null);

        // Create the Designs, which fails.

        restDesignsMockMvc.perform(post("/api/designs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(designs)))
            .andExpect(status().isBadRequest());

        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDesignPrefixIsRequired() throws Exception {
        int databaseSizeBeforeTest = designsRepository.findAll().size();
        // set the field null
        designs.setDesignPrefix(null);

        // Create the Designs, which fails.

        restDesignsMockMvc.perform(post("/api/designs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(designs)))
            .andExpect(status().isBadRequest());

        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDesigns() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList
        restDesignsMockMvc.perform(get("/api/designs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(designs.getId().intValue())))
            .andExpect(jsonPath("$.[*].designCode").value(hasItem(DEFAULT_DESIGN_CODE)))
            .andExpect(jsonPath("$.[*].designName").value(hasItem(DEFAULT_DESIGN_NAME)))
            .andExpect(jsonPath("$.[*].designPrefix").value(hasItem(DEFAULT_DESIGN_PREFIX)));
    }
    
    @Test
    @Transactional
    public void getDesigns() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get the designs
        restDesignsMockMvc.perform(get("/api/designs/{id}", designs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(designs.getId().intValue()))
            .andExpect(jsonPath("$.designCode").value(DEFAULT_DESIGN_CODE))
            .andExpect(jsonPath("$.designName").value(DEFAULT_DESIGN_NAME))
            .andExpect(jsonPath("$.designPrefix").value(DEFAULT_DESIGN_PREFIX));
    }


    @Test
    @Transactional
    public void getDesignsByIdFiltering() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        Long id = designs.getId();

        defaultDesignsShouldBeFound("id.equals=" + id);
        defaultDesignsShouldNotBeFound("id.notEquals=" + id);

        defaultDesignsShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultDesignsShouldNotBeFound("id.greaterThan=" + id);

        defaultDesignsShouldBeFound("id.lessThanOrEqual=" + id);
        defaultDesignsShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllDesignsByDesignCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designCode equals to DEFAULT_DESIGN_CODE
        defaultDesignsShouldBeFound("designCode.equals=" + DEFAULT_DESIGN_CODE);

        // Get all the designsList where designCode equals to UPDATED_DESIGN_CODE
        defaultDesignsShouldNotBeFound("designCode.equals=" + UPDATED_DESIGN_CODE);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignCodeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designCode not equals to DEFAULT_DESIGN_CODE
        defaultDesignsShouldNotBeFound("designCode.notEquals=" + DEFAULT_DESIGN_CODE);

        // Get all the designsList where designCode not equals to UPDATED_DESIGN_CODE
        defaultDesignsShouldBeFound("designCode.notEquals=" + UPDATED_DESIGN_CODE);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignCodeIsInShouldWork() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designCode in DEFAULT_DESIGN_CODE or UPDATED_DESIGN_CODE
        defaultDesignsShouldBeFound("designCode.in=" + DEFAULT_DESIGN_CODE + "," + UPDATED_DESIGN_CODE);

        // Get all the designsList where designCode equals to UPDATED_DESIGN_CODE
        defaultDesignsShouldNotBeFound("designCode.in=" + UPDATED_DESIGN_CODE);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designCode is not null
        defaultDesignsShouldBeFound("designCode.specified=true");

        // Get all the designsList where designCode is null
        defaultDesignsShouldNotBeFound("designCode.specified=false");
    }
                @Test
    @Transactional
    public void getAllDesignsByDesignCodeContainsSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designCode contains DEFAULT_DESIGN_CODE
        defaultDesignsShouldBeFound("designCode.contains=" + DEFAULT_DESIGN_CODE);

        // Get all the designsList where designCode contains UPDATED_DESIGN_CODE
        defaultDesignsShouldNotBeFound("designCode.contains=" + UPDATED_DESIGN_CODE);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignCodeNotContainsSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designCode does not contain DEFAULT_DESIGN_CODE
        defaultDesignsShouldNotBeFound("designCode.doesNotContain=" + DEFAULT_DESIGN_CODE);

        // Get all the designsList where designCode does not contain UPDATED_DESIGN_CODE
        defaultDesignsShouldBeFound("designCode.doesNotContain=" + UPDATED_DESIGN_CODE);
    }


    @Test
    @Transactional
    public void getAllDesignsByDesignNameIsEqualToSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designName equals to DEFAULT_DESIGN_NAME
        defaultDesignsShouldBeFound("designName.equals=" + DEFAULT_DESIGN_NAME);

        // Get all the designsList where designName equals to UPDATED_DESIGN_NAME
        defaultDesignsShouldNotBeFound("designName.equals=" + UPDATED_DESIGN_NAME);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designName not equals to DEFAULT_DESIGN_NAME
        defaultDesignsShouldNotBeFound("designName.notEquals=" + DEFAULT_DESIGN_NAME);

        // Get all the designsList where designName not equals to UPDATED_DESIGN_NAME
        defaultDesignsShouldBeFound("designName.notEquals=" + UPDATED_DESIGN_NAME);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignNameIsInShouldWork() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designName in DEFAULT_DESIGN_NAME or UPDATED_DESIGN_NAME
        defaultDesignsShouldBeFound("designName.in=" + DEFAULT_DESIGN_NAME + "," + UPDATED_DESIGN_NAME);

        // Get all the designsList where designName equals to UPDATED_DESIGN_NAME
        defaultDesignsShouldNotBeFound("designName.in=" + UPDATED_DESIGN_NAME);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designName is not null
        defaultDesignsShouldBeFound("designName.specified=true");

        // Get all the designsList where designName is null
        defaultDesignsShouldNotBeFound("designName.specified=false");
    }
                @Test
    @Transactional
    public void getAllDesignsByDesignNameContainsSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designName contains DEFAULT_DESIGN_NAME
        defaultDesignsShouldBeFound("designName.contains=" + DEFAULT_DESIGN_NAME);

        // Get all the designsList where designName contains UPDATED_DESIGN_NAME
        defaultDesignsShouldNotBeFound("designName.contains=" + UPDATED_DESIGN_NAME);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignNameNotContainsSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designName does not contain DEFAULT_DESIGN_NAME
        defaultDesignsShouldNotBeFound("designName.doesNotContain=" + DEFAULT_DESIGN_NAME);

        // Get all the designsList where designName does not contain UPDATED_DESIGN_NAME
        defaultDesignsShouldBeFound("designName.doesNotContain=" + UPDATED_DESIGN_NAME);
    }


    @Test
    @Transactional
    public void getAllDesignsByDesignPrefixIsEqualToSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designPrefix equals to DEFAULT_DESIGN_PREFIX
        defaultDesignsShouldBeFound("designPrefix.equals=" + DEFAULT_DESIGN_PREFIX);

        // Get all the designsList where designPrefix equals to UPDATED_DESIGN_PREFIX
        defaultDesignsShouldNotBeFound("designPrefix.equals=" + UPDATED_DESIGN_PREFIX);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignPrefixIsNotEqualToSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designPrefix not equals to DEFAULT_DESIGN_PREFIX
        defaultDesignsShouldNotBeFound("designPrefix.notEquals=" + DEFAULT_DESIGN_PREFIX);

        // Get all the designsList where designPrefix not equals to UPDATED_DESIGN_PREFIX
        defaultDesignsShouldBeFound("designPrefix.notEquals=" + UPDATED_DESIGN_PREFIX);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignPrefixIsInShouldWork() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designPrefix in DEFAULT_DESIGN_PREFIX or UPDATED_DESIGN_PREFIX
        defaultDesignsShouldBeFound("designPrefix.in=" + DEFAULT_DESIGN_PREFIX + "," + UPDATED_DESIGN_PREFIX);

        // Get all the designsList where designPrefix equals to UPDATED_DESIGN_PREFIX
        defaultDesignsShouldNotBeFound("designPrefix.in=" + UPDATED_DESIGN_PREFIX);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignPrefixIsNullOrNotNull() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designPrefix is not null
        defaultDesignsShouldBeFound("designPrefix.specified=true");

        // Get all the designsList where designPrefix is null
        defaultDesignsShouldNotBeFound("designPrefix.specified=false");
    }
                @Test
    @Transactional
    public void getAllDesignsByDesignPrefixContainsSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designPrefix contains DEFAULT_DESIGN_PREFIX
        defaultDesignsShouldBeFound("designPrefix.contains=" + DEFAULT_DESIGN_PREFIX);

        // Get all the designsList where designPrefix contains UPDATED_DESIGN_PREFIX
        defaultDesignsShouldNotBeFound("designPrefix.contains=" + UPDATED_DESIGN_PREFIX);
    }

    @Test
    @Transactional
    public void getAllDesignsByDesignPrefixNotContainsSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);

        // Get all the designsList where designPrefix does not contain DEFAULT_DESIGN_PREFIX
        defaultDesignsShouldNotBeFound("designPrefix.doesNotContain=" + DEFAULT_DESIGN_PREFIX);

        // Get all the designsList where designPrefix does not contain UPDATED_DESIGN_PREFIX
        defaultDesignsShouldBeFound("designPrefix.doesNotContain=" + UPDATED_DESIGN_PREFIX);
    }


    @Test
    @Transactional
    public void getAllDesignsByRelatedProductIsEqualToSomething() throws Exception {
        // Get already existing entity
        Products relatedProduct = designs.getRelatedProduct();
        designsRepository.saveAndFlush(designs);
        Long relatedProductId = relatedProduct.getId();

        // Get all the designsList where relatedProduct equals to relatedProductId
        defaultDesignsShouldBeFound("relatedProductId.equals=" + relatedProductId);

        // Get all the designsList where relatedProduct equals to relatedProductId + 1
        defaultDesignsShouldNotBeFound("relatedProductId.equals=" + (relatedProductId + 1));
    }


    @Test
    @Transactional
    public void getAllDesignsByLocationIsEqualToSomething() throws Exception {
        // Get already existing entity
        Location location = designs.getLocation();
        designsRepository.saveAndFlush(designs);
        Long locationId = location.getId();

        // Get all the designsList where location equals to locationId
        defaultDesignsShouldBeFound("locationId.equals=" + locationId);

        // Get all the designsList where location equals to locationId + 1
        defaultDesignsShouldNotBeFound("locationId.equals=" + (locationId + 1));
    }


    @Test
    @Transactional
    public void getAllDesignsByHistoryIsEqualToSomething() throws Exception {
        // Initialize the database
        designsRepository.saveAndFlush(designs);
        DocumentHistory history = DocumentHistoryResourceIT.createEntity(em);
        em.persist(history);
        em.flush();
        designs.setHistory(history);
        designsRepository.saveAndFlush(designs);
        Long historyId = history.getId();

        // Get all the designsList where history equals to historyId
        defaultDesignsShouldBeFound("historyId.equals=" + historyId);

        // Get all the designsList where history equals to historyId + 1
        defaultDesignsShouldNotBeFound("historyId.equals=" + (historyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDesignsShouldBeFound(String filter) throws Exception {
        restDesignsMockMvc.perform(get("/api/designs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(designs.getId().intValue())))
            .andExpect(jsonPath("$.[*].designCode").value(hasItem(DEFAULT_DESIGN_CODE)))
            .andExpect(jsonPath("$.[*].designName").value(hasItem(DEFAULT_DESIGN_NAME)))
            .andExpect(jsonPath("$.[*].designPrefix").value(hasItem(DEFAULT_DESIGN_PREFIX)));

        // Check, that the count call also returns 1
        restDesignsMockMvc.perform(get("/api/designs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDesignsShouldNotBeFound(String filter) throws Exception {
        restDesignsMockMvc.perform(get("/api/designs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDesignsMockMvc.perform(get("/api/designs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingDesigns() throws Exception {
        // Get the designs
        restDesignsMockMvc.perform(get("/api/designs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDesigns() throws Exception {
        // Initialize the database
        designsService.save(designs);

        int databaseSizeBeforeUpdate = designsRepository.findAll().size();

        // Update the designs
        Designs updatedDesigns = designsRepository.findById(designs.getId()).get();
        // Disconnect from session so that the updates on updatedDesigns are not directly saved in db
        em.detach(updatedDesigns);
        updatedDesigns
            .designCode(UPDATED_DESIGN_CODE)
            .designName(UPDATED_DESIGN_NAME)
            .designPrefix(UPDATED_DESIGN_PREFIX);

        restDesignsMockMvc.perform(put("/api/designs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDesigns)))
            .andExpect(status().isOk());

        // Validate the Designs in the database
        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeUpdate);
        Designs testDesigns = designsList.get(designsList.size() - 1);
        assertThat(testDesigns.getDesignCode()).isEqualTo(UPDATED_DESIGN_CODE);
        assertThat(testDesigns.getDesignName()).isEqualTo(UPDATED_DESIGN_NAME);
        assertThat(testDesigns.getDesignPrefix()).isEqualTo(UPDATED_DESIGN_PREFIX);
    }

    @Test
    @Transactional
    public void updateNonExistingDesigns() throws Exception {
        int databaseSizeBeforeUpdate = designsRepository.findAll().size();

        // Create the Designs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDesignsMockMvc.perform(put("/api/designs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(designs)))
            .andExpect(status().isBadRequest());

        // Validate the Designs in the database
        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDesigns() throws Exception {
        // Initialize the database
        designsService.save(designs);

        int databaseSizeBeforeDelete = designsRepository.findAll().size();

        // Delete the designs
        restDesignsMockMvc.perform(delete("/api/designs/{id}", designs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Designs> designsList = designsRepository.findAll();
        assertThat(designsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
