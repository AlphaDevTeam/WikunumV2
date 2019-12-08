package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.WikunumV2App;
import com.alphadevs.sales.domain.Supplier;
import com.alphadevs.sales.domain.Location;
import com.alphadevs.sales.domain.DocumentHistory;
import com.alphadevs.sales.repository.SupplierRepository;
import com.alphadevs.sales.service.SupplierService;
import com.alphadevs.sales.web.rest.errors.ExceptionTranslator;
import com.alphadevs.sales.service.dto.SupplierCriteria;
import com.alphadevs.sales.service.SupplierQueryService;

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
import java.math.BigDecimal;
import java.util.List;

import static com.alphadevs.sales.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SupplierResource} REST controller.
 */
@SpringBootTest(classes = WikunumV2App.class)
public class SupplierResourceIT {

    private static final String DEFAULT_SUPPLIER_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLIER_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLIER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLIER_NAME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_SUPPLIER_CREDIT_LIMIT = new BigDecimal(1);
    private static final BigDecimal UPDATED_SUPPLIER_CREDIT_LIMIT = new BigDecimal(2);
    private static final BigDecimal SMALLER_SUPPLIER_CREDIT_LIMIT = new BigDecimal(1 - 1);

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Double DEFAULT_RATING = 1D;
    private static final Double UPDATED_RATING = 2D;
    private static final Double SMALLER_RATING = 1D - 1D;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private SupplierQueryService supplierQueryService;

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

    private MockMvc restSupplierMockMvc;

    private Supplier supplier;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplierResource supplierResource = new SupplierResource(supplierService, supplierQueryService);
        this.restSupplierMockMvc = MockMvcBuilders.standaloneSetup(supplierResource)
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
    public static Supplier createEntity(EntityManager em) {
        Supplier supplier = new Supplier()
            .supplierCode(DEFAULT_SUPPLIER_CODE)
            .supplierName(DEFAULT_SUPPLIER_NAME)
            .supplierCreditLimit(DEFAULT_SUPPLIER_CREDIT_LIMIT)
            .isActive(DEFAULT_IS_ACTIVE)
            .rating(DEFAULT_RATING);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        supplier.setLocation(location);
        return supplier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Supplier createUpdatedEntity(EntityManager em) {
        Supplier supplier = new Supplier()
            .supplierCode(UPDATED_SUPPLIER_CODE)
            .supplierName(UPDATED_SUPPLIER_NAME)
            .supplierCreditLimit(UPDATED_SUPPLIER_CREDIT_LIMIT)
            .isActive(UPDATED_IS_ACTIVE)
            .rating(UPDATED_RATING);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createUpdatedEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        supplier.setLocation(location);
        return supplier;
    }

    @BeforeEach
    public void initTest() {
        supplier = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplier() throws Exception {
        int databaseSizeBeforeCreate = supplierRepository.findAll().size();

        // Create the Supplier
        restSupplierMockMvc.perform(post("/api/suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplier)))
            .andExpect(status().isCreated());

        // Validate the Supplier in the database
        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeCreate + 1);
        Supplier testSupplier = supplierList.get(supplierList.size() - 1);
        assertThat(testSupplier.getSupplierCode()).isEqualTo(DEFAULT_SUPPLIER_CODE);
        assertThat(testSupplier.getSupplierName()).isEqualTo(DEFAULT_SUPPLIER_NAME);
        assertThat(testSupplier.getSupplierCreditLimit()).isEqualTo(DEFAULT_SUPPLIER_CREDIT_LIMIT);
        assertThat(testSupplier.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testSupplier.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createSupplierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplierRepository.findAll().size();

        // Create the Supplier with an existing ID
        supplier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplierMockMvc.perform(post("/api/suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplier)))
            .andExpect(status().isBadRequest());

        // Validate the Supplier in the database
        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSupplierCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierRepository.findAll().size();
        // set the field null
        supplier.setSupplierCode(null);

        // Create the Supplier, which fails.

        restSupplierMockMvc.perform(post("/api/suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplier)))
            .andExpect(status().isBadRequest());

        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSupplierNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierRepository.findAll().size();
        // set the field null
        supplier.setSupplierName(null);

        // Create the Supplier, which fails.

        restSupplierMockMvc.perform(post("/api/suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplier)))
            .andExpect(status().isBadRequest());

        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSupplierCreditLimitIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierRepository.findAll().size();
        // set the field null
        supplier.setSupplierCreditLimit(null);

        // Create the Supplier, which fails.

        restSupplierMockMvc.perform(post("/api/suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplier)))
            .andExpect(status().isBadRequest());

        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSuppliers() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList
        restSupplierMockMvc.perform(get("/api/suppliers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplier.getId().intValue())))
            .andExpect(jsonPath("$.[*].supplierCode").value(hasItem(DEFAULT_SUPPLIER_CODE)))
            .andExpect(jsonPath("$.[*].supplierName").value(hasItem(DEFAULT_SUPPLIER_NAME)))
            .andExpect(jsonPath("$.[*].supplierCreditLimit").value(hasItem(DEFAULT_SUPPLIER_CREDIT_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getSupplier() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get the supplier
        restSupplierMockMvc.perform(get("/api/suppliers/{id}", supplier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplier.getId().intValue()))
            .andExpect(jsonPath("$.supplierCode").value(DEFAULT_SUPPLIER_CODE))
            .andExpect(jsonPath("$.supplierName").value(DEFAULT_SUPPLIER_NAME))
            .andExpect(jsonPath("$.supplierCreditLimit").value(DEFAULT_SUPPLIER_CREDIT_LIMIT.intValue()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()));
    }


    @Test
    @Transactional
    public void getSuppliersByIdFiltering() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        Long id = supplier.getId();

        defaultSupplierShouldBeFound("id.equals=" + id);
        defaultSupplierShouldNotBeFound("id.notEquals=" + id);

        defaultSupplierShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultSupplierShouldNotBeFound("id.greaterThan=" + id);

        defaultSupplierShouldBeFound("id.lessThanOrEqual=" + id);
        defaultSupplierShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllSuppliersBySupplierCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCode equals to DEFAULT_SUPPLIER_CODE
        defaultSupplierShouldBeFound("supplierCode.equals=" + DEFAULT_SUPPLIER_CODE);

        // Get all the supplierList where supplierCode equals to UPDATED_SUPPLIER_CODE
        defaultSupplierShouldNotBeFound("supplierCode.equals=" + UPDATED_SUPPLIER_CODE);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCodeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCode not equals to DEFAULT_SUPPLIER_CODE
        defaultSupplierShouldNotBeFound("supplierCode.notEquals=" + DEFAULT_SUPPLIER_CODE);

        // Get all the supplierList where supplierCode not equals to UPDATED_SUPPLIER_CODE
        defaultSupplierShouldBeFound("supplierCode.notEquals=" + UPDATED_SUPPLIER_CODE);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCodeIsInShouldWork() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCode in DEFAULT_SUPPLIER_CODE or UPDATED_SUPPLIER_CODE
        defaultSupplierShouldBeFound("supplierCode.in=" + DEFAULT_SUPPLIER_CODE + "," + UPDATED_SUPPLIER_CODE);

        // Get all the supplierList where supplierCode equals to UPDATED_SUPPLIER_CODE
        defaultSupplierShouldNotBeFound("supplierCode.in=" + UPDATED_SUPPLIER_CODE);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCode is not null
        defaultSupplierShouldBeFound("supplierCode.specified=true");

        // Get all the supplierList where supplierCode is null
        defaultSupplierShouldNotBeFound("supplierCode.specified=false");
    }
                @Test
    @Transactional
    public void getAllSuppliersBySupplierCodeContainsSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCode contains DEFAULT_SUPPLIER_CODE
        defaultSupplierShouldBeFound("supplierCode.contains=" + DEFAULT_SUPPLIER_CODE);

        // Get all the supplierList where supplierCode contains UPDATED_SUPPLIER_CODE
        defaultSupplierShouldNotBeFound("supplierCode.contains=" + UPDATED_SUPPLIER_CODE);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCodeNotContainsSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCode does not contain DEFAULT_SUPPLIER_CODE
        defaultSupplierShouldNotBeFound("supplierCode.doesNotContain=" + DEFAULT_SUPPLIER_CODE);

        // Get all the supplierList where supplierCode does not contain UPDATED_SUPPLIER_CODE
        defaultSupplierShouldBeFound("supplierCode.doesNotContain=" + UPDATED_SUPPLIER_CODE);
    }


    @Test
    @Transactional
    public void getAllSuppliersBySupplierNameIsEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierName equals to DEFAULT_SUPPLIER_NAME
        defaultSupplierShouldBeFound("supplierName.equals=" + DEFAULT_SUPPLIER_NAME);

        // Get all the supplierList where supplierName equals to UPDATED_SUPPLIER_NAME
        defaultSupplierShouldNotBeFound("supplierName.equals=" + UPDATED_SUPPLIER_NAME);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierName not equals to DEFAULT_SUPPLIER_NAME
        defaultSupplierShouldNotBeFound("supplierName.notEquals=" + DEFAULT_SUPPLIER_NAME);

        // Get all the supplierList where supplierName not equals to UPDATED_SUPPLIER_NAME
        defaultSupplierShouldBeFound("supplierName.notEquals=" + UPDATED_SUPPLIER_NAME);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierNameIsInShouldWork() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierName in DEFAULT_SUPPLIER_NAME or UPDATED_SUPPLIER_NAME
        defaultSupplierShouldBeFound("supplierName.in=" + DEFAULT_SUPPLIER_NAME + "," + UPDATED_SUPPLIER_NAME);

        // Get all the supplierList where supplierName equals to UPDATED_SUPPLIER_NAME
        defaultSupplierShouldNotBeFound("supplierName.in=" + UPDATED_SUPPLIER_NAME);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierName is not null
        defaultSupplierShouldBeFound("supplierName.specified=true");

        // Get all the supplierList where supplierName is null
        defaultSupplierShouldNotBeFound("supplierName.specified=false");
    }
                @Test
    @Transactional
    public void getAllSuppliersBySupplierNameContainsSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierName contains DEFAULT_SUPPLIER_NAME
        defaultSupplierShouldBeFound("supplierName.contains=" + DEFAULT_SUPPLIER_NAME);

        // Get all the supplierList where supplierName contains UPDATED_SUPPLIER_NAME
        defaultSupplierShouldNotBeFound("supplierName.contains=" + UPDATED_SUPPLIER_NAME);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierNameNotContainsSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierName does not contain DEFAULT_SUPPLIER_NAME
        defaultSupplierShouldNotBeFound("supplierName.doesNotContain=" + DEFAULT_SUPPLIER_NAME);

        // Get all the supplierList where supplierName does not contain UPDATED_SUPPLIER_NAME
        defaultSupplierShouldBeFound("supplierName.doesNotContain=" + UPDATED_SUPPLIER_NAME);
    }


    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit equals to DEFAULT_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldBeFound("supplierCreditLimit.equals=" + DEFAULT_SUPPLIER_CREDIT_LIMIT);

        // Get all the supplierList where supplierCreditLimit equals to UPDATED_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldNotBeFound("supplierCreditLimit.equals=" + UPDATED_SUPPLIER_CREDIT_LIMIT);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsNotEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit not equals to DEFAULT_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldNotBeFound("supplierCreditLimit.notEquals=" + DEFAULT_SUPPLIER_CREDIT_LIMIT);

        // Get all the supplierList where supplierCreditLimit not equals to UPDATED_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldBeFound("supplierCreditLimit.notEquals=" + UPDATED_SUPPLIER_CREDIT_LIMIT);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsInShouldWork() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit in DEFAULT_SUPPLIER_CREDIT_LIMIT or UPDATED_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldBeFound("supplierCreditLimit.in=" + DEFAULT_SUPPLIER_CREDIT_LIMIT + "," + UPDATED_SUPPLIER_CREDIT_LIMIT);

        // Get all the supplierList where supplierCreditLimit equals to UPDATED_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldNotBeFound("supplierCreditLimit.in=" + UPDATED_SUPPLIER_CREDIT_LIMIT);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsNullOrNotNull() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit is not null
        defaultSupplierShouldBeFound("supplierCreditLimit.specified=true");

        // Get all the supplierList where supplierCreditLimit is null
        defaultSupplierShouldNotBeFound("supplierCreditLimit.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit is greater than or equal to DEFAULT_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldBeFound("supplierCreditLimit.greaterThanOrEqual=" + DEFAULT_SUPPLIER_CREDIT_LIMIT);

        // Get all the supplierList where supplierCreditLimit is greater than or equal to UPDATED_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldNotBeFound("supplierCreditLimit.greaterThanOrEqual=" + UPDATED_SUPPLIER_CREDIT_LIMIT);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit is less than or equal to DEFAULT_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldBeFound("supplierCreditLimit.lessThanOrEqual=" + DEFAULT_SUPPLIER_CREDIT_LIMIT);

        // Get all the supplierList where supplierCreditLimit is less than or equal to SMALLER_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldNotBeFound("supplierCreditLimit.lessThanOrEqual=" + SMALLER_SUPPLIER_CREDIT_LIMIT);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsLessThanSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit is less than DEFAULT_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldNotBeFound("supplierCreditLimit.lessThan=" + DEFAULT_SUPPLIER_CREDIT_LIMIT);

        // Get all the supplierList where supplierCreditLimit is less than UPDATED_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldBeFound("supplierCreditLimit.lessThan=" + UPDATED_SUPPLIER_CREDIT_LIMIT);
    }

    @Test
    @Transactional
    public void getAllSuppliersBySupplierCreditLimitIsGreaterThanSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where supplierCreditLimit is greater than DEFAULT_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldNotBeFound("supplierCreditLimit.greaterThan=" + DEFAULT_SUPPLIER_CREDIT_LIMIT);

        // Get all the supplierList where supplierCreditLimit is greater than SMALLER_SUPPLIER_CREDIT_LIMIT
        defaultSupplierShouldBeFound("supplierCreditLimit.greaterThan=" + SMALLER_SUPPLIER_CREDIT_LIMIT);
    }


    @Test
    @Transactional
    public void getAllSuppliersByIsActiveIsEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where isActive equals to DEFAULT_IS_ACTIVE
        defaultSupplierShouldBeFound("isActive.equals=" + DEFAULT_IS_ACTIVE);

        // Get all the supplierList where isActive equals to UPDATED_IS_ACTIVE
        defaultSupplierShouldNotBeFound("isActive.equals=" + UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void getAllSuppliersByIsActiveIsNotEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where isActive not equals to DEFAULT_IS_ACTIVE
        defaultSupplierShouldNotBeFound("isActive.notEquals=" + DEFAULT_IS_ACTIVE);

        // Get all the supplierList where isActive not equals to UPDATED_IS_ACTIVE
        defaultSupplierShouldBeFound("isActive.notEquals=" + UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void getAllSuppliersByIsActiveIsInShouldWork() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where isActive in DEFAULT_IS_ACTIVE or UPDATED_IS_ACTIVE
        defaultSupplierShouldBeFound("isActive.in=" + DEFAULT_IS_ACTIVE + "," + UPDATED_IS_ACTIVE);

        // Get all the supplierList where isActive equals to UPDATED_IS_ACTIVE
        defaultSupplierShouldNotBeFound("isActive.in=" + UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void getAllSuppliersByIsActiveIsNullOrNotNull() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where isActive is not null
        defaultSupplierShouldBeFound("isActive.specified=true");

        // Get all the supplierList where isActive is null
        defaultSupplierShouldNotBeFound("isActive.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating equals to DEFAULT_RATING
        defaultSupplierShouldBeFound("rating.equals=" + DEFAULT_RATING);

        // Get all the supplierList where rating equals to UPDATED_RATING
        defaultSupplierShouldNotBeFound("rating.equals=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsNotEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating not equals to DEFAULT_RATING
        defaultSupplierShouldNotBeFound("rating.notEquals=" + DEFAULT_RATING);

        // Get all the supplierList where rating not equals to UPDATED_RATING
        defaultSupplierShouldBeFound("rating.notEquals=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsInShouldWork() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating in DEFAULT_RATING or UPDATED_RATING
        defaultSupplierShouldBeFound("rating.in=" + DEFAULT_RATING + "," + UPDATED_RATING);

        // Get all the supplierList where rating equals to UPDATED_RATING
        defaultSupplierShouldNotBeFound("rating.in=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsNullOrNotNull() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating is not null
        defaultSupplierShouldBeFound("rating.specified=true");

        // Get all the supplierList where rating is null
        defaultSupplierShouldNotBeFound("rating.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating is greater than or equal to DEFAULT_RATING
        defaultSupplierShouldBeFound("rating.greaterThanOrEqual=" + DEFAULT_RATING);

        // Get all the supplierList where rating is greater than or equal to UPDATED_RATING
        defaultSupplierShouldNotBeFound("rating.greaterThanOrEqual=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating is less than or equal to DEFAULT_RATING
        defaultSupplierShouldBeFound("rating.lessThanOrEqual=" + DEFAULT_RATING);

        // Get all the supplierList where rating is less than or equal to SMALLER_RATING
        defaultSupplierShouldNotBeFound("rating.lessThanOrEqual=" + SMALLER_RATING);
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsLessThanSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating is less than DEFAULT_RATING
        defaultSupplierShouldNotBeFound("rating.lessThan=" + DEFAULT_RATING);

        // Get all the supplierList where rating is less than UPDATED_RATING
        defaultSupplierShouldBeFound("rating.lessThan=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllSuppliersByRatingIsGreaterThanSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);

        // Get all the supplierList where rating is greater than DEFAULT_RATING
        defaultSupplierShouldNotBeFound("rating.greaterThan=" + DEFAULT_RATING);

        // Get all the supplierList where rating is greater than SMALLER_RATING
        defaultSupplierShouldBeFound("rating.greaterThan=" + SMALLER_RATING);
    }


    @Test
    @Transactional
    public void getAllSuppliersByLocationIsEqualToSomething() throws Exception {
        // Get already existing entity
        Location location = supplier.getLocation();
        supplierRepository.saveAndFlush(supplier);
        Long locationId = location.getId();

        // Get all the supplierList where location equals to locationId
        defaultSupplierShouldBeFound("locationId.equals=" + locationId);

        // Get all the supplierList where location equals to locationId + 1
        defaultSupplierShouldNotBeFound("locationId.equals=" + (locationId + 1));
    }


    @Test
    @Transactional
    public void getAllSuppliersByHistoryIsEqualToSomething() throws Exception {
        // Initialize the database
        supplierRepository.saveAndFlush(supplier);
        DocumentHistory history = DocumentHistoryResourceIT.createEntity(em);
        em.persist(history);
        em.flush();
        supplier.setHistory(history);
        supplierRepository.saveAndFlush(supplier);
        Long historyId = history.getId();

        // Get all the supplierList where history equals to historyId
        defaultSupplierShouldBeFound("historyId.equals=" + historyId);

        // Get all the supplierList where history equals to historyId + 1
        defaultSupplierShouldNotBeFound("historyId.equals=" + (historyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultSupplierShouldBeFound(String filter) throws Exception {
        restSupplierMockMvc.perform(get("/api/suppliers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplier.getId().intValue())))
            .andExpect(jsonPath("$.[*].supplierCode").value(hasItem(DEFAULT_SUPPLIER_CODE)))
            .andExpect(jsonPath("$.[*].supplierName").value(hasItem(DEFAULT_SUPPLIER_NAME)))
            .andExpect(jsonPath("$.[*].supplierCreditLimit").value(hasItem(DEFAULT_SUPPLIER_CREDIT_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));

        // Check, that the count call also returns 1
        restSupplierMockMvc.perform(get("/api/suppliers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultSupplierShouldNotBeFound(String filter) throws Exception {
        restSupplierMockMvc.perform(get("/api/suppliers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restSupplierMockMvc.perform(get("/api/suppliers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingSupplier() throws Exception {
        // Get the supplier
        restSupplierMockMvc.perform(get("/api/suppliers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplier() throws Exception {
        // Initialize the database
        supplierService.save(supplier);

        int databaseSizeBeforeUpdate = supplierRepository.findAll().size();

        // Update the supplier
        Supplier updatedSupplier = supplierRepository.findById(supplier.getId()).get();
        // Disconnect from session so that the updates on updatedSupplier are not directly saved in db
        em.detach(updatedSupplier);
        updatedSupplier
            .supplierCode(UPDATED_SUPPLIER_CODE)
            .supplierName(UPDATED_SUPPLIER_NAME)
            .supplierCreditLimit(UPDATED_SUPPLIER_CREDIT_LIMIT)
            .isActive(UPDATED_IS_ACTIVE)
            .rating(UPDATED_RATING);

        restSupplierMockMvc.perform(put("/api/suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupplier)))
            .andExpect(status().isOk());

        // Validate the Supplier in the database
        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeUpdate);
        Supplier testSupplier = supplierList.get(supplierList.size() - 1);
        assertThat(testSupplier.getSupplierCode()).isEqualTo(UPDATED_SUPPLIER_CODE);
        assertThat(testSupplier.getSupplierName()).isEqualTo(UPDATED_SUPPLIER_NAME);
        assertThat(testSupplier.getSupplierCreditLimit()).isEqualTo(UPDATED_SUPPLIER_CREDIT_LIMIT);
        assertThat(testSupplier.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testSupplier.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplier() throws Exception {
        int databaseSizeBeforeUpdate = supplierRepository.findAll().size();

        // Create the Supplier

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupplierMockMvc.perform(put("/api/suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplier)))
            .andExpect(status().isBadRequest());

        // Validate the Supplier in the database
        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSupplier() throws Exception {
        // Initialize the database
        supplierService.save(supplier);

        int databaseSizeBeforeDelete = supplierRepository.findAll().size();

        // Delete the supplier
        restSupplierMockMvc.perform(delete("/api/suppliers/{id}", supplier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Supplier> supplierList = supplierRepository.findAll();
        assertThat(supplierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
