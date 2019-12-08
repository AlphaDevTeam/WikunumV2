package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.WikunumV2App;
import com.alphadevs.sales.domain.CashReceiptVoucherSupplier;
import com.alphadevs.sales.domain.Location;
import com.alphadevs.sales.domain.TransactionType;
import com.alphadevs.sales.domain.Supplier;
import com.alphadevs.sales.domain.DocumentHistory;
import com.alphadevs.sales.repository.CashReceiptVoucherSupplierRepository;
import com.alphadevs.sales.service.CashReceiptVoucherSupplierService;
import com.alphadevs.sales.web.rest.errors.ExceptionTranslator;
import com.alphadevs.sales.service.dto.CashReceiptVoucherSupplierCriteria;
import com.alphadevs.sales.service.CashReceiptVoucherSupplierQueryService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.alphadevs.sales.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CashReceiptVoucherSupplierResource} REST controller.
 */
@SpringBootTest(classes = WikunumV2App.class)
public class CashReceiptVoucherSupplierResourceIT {

    private static final LocalDate DEFAULT_TRANSACTION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRANSACTION_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_TRANSACTION_DATE = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_TRANSACTION_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_TRANSACTION_AMOUNT_DR = new BigDecimal(1);
    private static final BigDecimal UPDATED_TRANSACTION_AMOUNT_DR = new BigDecimal(2);
    private static final BigDecimal SMALLER_TRANSACTION_AMOUNT_DR = new BigDecimal(1 - 1);

    private static final BigDecimal DEFAULT_TRANSACTION_AMOUNT_CR = new BigDecimal(1);
    private static final BigDecimal UPDATED_TRANSACTION_AMOUNT_CR = new BigDecimal(2);
    private static final BigDecimal SMALLER_TRANSACTION_AMOUNT_CR = new BigDecimal(1 - 1);

    @Autowired
    private CashReceiptVoucherSupplierRepository cashReceiptVoucherSupplierRepository;

    @Autowired
    private CashReceiptVoucherSupplierService cashReceiptVoucherSupplierService;

    @Autowired
    private CashReceiptVoucherSupplierQueryService cashReceiptVoucherSupplierQueryService;

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

    private MockMvc restCashReceiptVoucherSupplierMockMvc;

    private CashReceiptVoucherSupplier cashReceiptVoucherSupplier;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashReceiptVoucherSupplierResource cashReceiptVoucherSupplierResource = new CashReceiptVoucherSupplierResource(cashReceiptVoucherSupplierService, cashReceiptVoucherSupplierQueryService);
        this.restCashReceiptVoucherSupplierMockMvc = MockMvcBuilders.standaloneSetup(cashReceiptVoucherSupplierResource)
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
    public static CashReceiptVoucherSupplier createEntity(EntityManager em) {
        CashReceiptVoucherSupplier cashReceiptVoucherSupplier = new CashReceiptVoucherSupplier()
            .transactionDate(DEFAULT_TRANSACTION_DATE)
            .transactionDescription(DEFAULT_TRANSACTION_DESCRIPTION)
            .transactionAmountDR(DEFAULT_TRANSACTION_AMOUNT_DR)
            .transactionAmountCR(DEFAULT_TRANSACTION_AMOUNT_CR);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        cashReceiptVoucherSupplier.setLocation(location);
        // Add required entity
        TransactionType transactionType;
        if (TestUtil.findAll(em, TransactionType.class).isEmpty()) {
            transactionType = TransactionTypeResourceIT.createEntity(em);
            em.persist(transactionType);
            em.flush();
        } else {
            transactionType = TestUtil.findAll(em, TransactionType.class).get(0);
        }
        cashReceiptVoucherSupplier.setTransactionType(transactionType);
        // Add required entity
        Supplier supplier;
        if (TestUtil.findAll(em, Supplier.class).isEmpty()) {
            supplier = SupplierResourceIT.createEntity(em);
            em.persist(supplier);
            em.flush();
        } else {
            supplier = TestUtil.findAll(em, Supplier.class).get(0);
        }
        cashReceiptVoucherSupplier.setSupplier(supplier);
        return cashReceiptVoucherSupplier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CashReceiptVoucherSupplier createUpdatedEntity(EntityManager em) {
        CashReceiptVoucherSupplier cashReceiptVoucherSupplier = new CashReceiptVoucherSupplier()
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .transactionDescription(UPDATED_TRANSACTION_DESCRIPTION)
            .transactionAmountDR(UPDATED_TRANSACTION_AMOUNT_DR)
            .transactionAmountCR(UPDATED_TRANSACTION_AMOUNT_CR);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createUpdatedEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        cashReceiptVoucherSupplier.setLocation(location);
        // Add required entity
        TransactionType transactionType;
        if (TestUtil.findAll(em, TransactionType.class).isEmpty()) {
            transactionType = TransactionTypeResourceIT.createUpdatedEntity(em);
            em.persist(transactionType);
            em.flush();
        } else {
            transactionType = TestUtil.findAll(em, TransactionType.class).get(0);
        }
        cashReceiptVoucherSupplier.setTransactionType(transactionType);
        // Add required entity
        Supplier supplier;
        if (TestUtil.findAll(em, Supplier.class).isEmpty()) {
            supplier = SupplierResourceIT.createUpdatedEntity(em);
            em.persist(supplier);
            em.flush();
        } else {
            supplier = TestUtil.findAll(em, Supplier.class).get(0);
        }
        cashReceiptVoucherSupplier.setSupplier(supplier);
        return cashReceiptVoucherSupplier;
    }

    @BeforeEach
    public void initTest() {
        cashReceiptVoucherSupplier = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashReceiptVoucherSupplier() throws Exception {
        int databaseSizeBeforeCreate = cashReceiptVoucherSupplierRepository.findAll().size();

        // Create the CashReceiptVoucherSupplier
        restCashReceiptVoucherSupplierMockMvc.perform(post("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherSupplier)))
            .andExpect(status().isCreated());

        // Validate the CashReceiptVoucherSupplier in the database
        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeCreate + 1);
        CashReceiptVoucherSupplier testCashReceiptVoucherSupplier = cashReceiptVoucherSupplierList.get(cashReceiptVoucherSupplierList.size() - 1);
        assertThat(testCashReceiptVoucherSupplier.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
        assertThat(testCashReceiptVoucherSupplier.getTransactionDescription()).isEqualTo(DEFAULT_TRANSACTION_DESCRIPTION);
        assertThat(testCashReceiptVoucherSupplier.getTransactionAmountDR()).isEqualTo(DEFAULT_TRANSACTION_AMOUNT_DR);
        assertThat(testCashReceiptVoucherSupplier.getTransactionAmountCR()).isEqualTo(DEFAULT_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void createCashReceiptVoucherSupplierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashReceiptVoucherSupplierRepository.findAll().size();

        // Create the CashReceiptVoucherSupplier with an existing ID
        cashReceiptVoucherSupplier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashReceiptVoucherSupplierMockMvc.perform(post("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherSupplier)))
            .andExpect(status().isBadRequest());

        // Validate the CashReceiptVoucherSupplier in the database
        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTransactionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherSupplierRepository.findAll().size();
        // set the field null
        cashReceiptVoucherSupplier.setTransactionDate(null);

        // Create the CashReceiptVoucherSupplier, which fails.

        restCashReceiptVoucherSupplierMockMvc.perform(post("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherSupplier)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherSupplierRepository.findAll().size();
        // set the field null
        cashReceiptVoucherSupplier.setTransactionDescription(null);

        // Create the CashReceiptVoucherSupplier, which fails.

        restCashReceiptVoucherSupplierMockMvc.perform(post("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherSupplier)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionAmountDRIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherSupplierRepository.findAll().size();
        // set the field null
        cashReceiptVoucherSupplier.setTransactionAmountDR(null);

        // Create the CashReceiptVoucherSupplier, which fails.

        restCashReceiptVoucherSupplierMockMvc.perform(post("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherSupplier)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionAmountCRIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherSupplierRepository.findAll().size();
        // set the field null
        cashReceiptVoucherSupplier.setTransactionAmountCR(null);

        // Create the CashReceiptVoucherSupplier, which fails.

        restCashReceiptVoucherSupplierMockMvc.perform(post("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherSupplier)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliers() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList
        restCashReceiptVoucherSupplierMockMvc.perform(get("/api/cash-receipt-voucher-suppliers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashReceiptVoucherSupplier.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionDescription").value(hasItem(DEFAULT_TRANSACTION_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].transactionAmountDR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_DR.intValue())))
            .andExpect(jsonPath("$.[*].transactionAmountCR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_CR.intValue())));
    }
    
    @Test
    @Transactional
    public void getCashReceiptVoucherSupplier() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get the cashReceiptVoucherSupplier
        restCashReceiptVoucherSupplierMockMvc.perform(get("/api/cash-receipt-voucher-suppliers/{id}", cashReceiptVoucherSupplier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashReceiptVoucherSupplier.getId().intValue()))
            .andExpect(jsonPath("$.transactionDate").value(DEFAULT_TRANSACTION_DATE.toString()))
            .andExpect(jsonPath("$.transactionDescription").value(DEFAULT_TRANSACTION_DESCRIPTION))
            .andExpect(jsonPath("$.transactionAmountDR").value(DEFAULT_TRANSACTION_AMOUNT_DR.intValue()))
            .andExpect(jsonPath("$.transactionAmountCR").value(DEFAULT_TRANSACTION_AMOUNT_CR.intValue()));
    }


    @Test
    @Transactional
    public void getCashReceiptVoucherSuppliersByIdFiltering() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        Long id = cashReceiptVoucherSupplier.getId();

        defaultCashReceiptVoucherSupplierShouldBeFound("id.equals=" + id);
        defaultCashReceiptVoucherSupplierShouldNotBeFound("id.notEquals=" + id);

        defaultCashReceiptVoucherSupplierShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultCashReceiptVoucherSupplierShouldNotBeFound("id.greaterThan=" + id);

        defaultCashReceiptVoucherSupplierShouldBeFound("id.lessThanOrEqual=" + id);
        defaultCashReceiptVoucherSupplierShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate equals to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.equals=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherSupplierList where transactionDate equals to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.equals=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate not equals to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.notEquals=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherSupplierList where transactionDate not equals to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.notEquals=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate in DEFAULT_TRANSACTION_DATE or UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.in=" + DEFAULT_TRANSACTION_DATE + "," + UPDATED_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherSupplierList where transactionDate equals to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.in=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is not null
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.specified=true");

        // Get all the cashReceiptVoucherSupplierList where transactionDate is null
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is greater than or equal to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.greaterThanOrEqual=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is greater than or equal to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.greaterThanOrEqual=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is less than or equal to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.lessThanOrEqual=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is less than or equal to SMALLER_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.lessThanOrEqual=" + SMALLER_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsLessThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is less than DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.lessThan=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is less than UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.lessThan=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is greater than DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDate.greaterThan=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherSupplierList where transactionDate is greater than SMALLER_TRANSACTION_DATE
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDate.greaterThan=" + SMALLER_TRANSACTION_DATE);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription equals to DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDescription.equals=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription equals to UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDescription.equals=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDescriptionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription not equals to DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDescription.notEquals=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription not equals to UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDescription.notEquals=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription in DEFAULT_TRANSACTION_DESCRIPTION or UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDescription.in=" + DEFAULT_TRANSACTION_DESCRIPTION + "," + UPDATED_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription equals to UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDescription.in=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription is not null
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDescription.specified=true");

        // Get all the cashReceiptVoucherSupplierList where transactionDescription is null
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDescription.specified=false");
    }
                @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDescriptionContainsSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription contains DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDescription.contains=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription contains UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDescription.contains=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionDescriptionNotContainsSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription does not contain DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionDescription.doesNotContain=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherSupplierList where transactionDescription does not contain UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionDescription.doesNotContain=" + UPDATED_TRANSACTION_DESCRIPTION);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR equals to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.equals=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR equals to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.equals=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR not equals to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.notEquals=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR not equals to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.notEquals=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR in DEFAULT_TRANSACTION_AMOUNT_DR or UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.in=" + DEFAULT_TRANSACTION_AMOUNT_DR + "," + UPDATED_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR equals to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.in=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is not null
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.specified=true");

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is null
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.specified=false");
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is greater than or equal to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.greaterThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is greater than or equal to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.greaterThanOrEqual=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is less than or equal to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.lessThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is less than or equal to SMALLER_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.lessThanOrEqual=" + SMALLER_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsLessThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is less than DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.lessThan=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is less than UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.lessThan=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountDRIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is greater than DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountDR.greaterThan=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountDR is greater than SMALLER_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountDR.greaterThan=" + SMALLER_TRANSACTION_AMOUNT_DR);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR equals to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.equals=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR equals to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.equals=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR not equals to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.notEquals=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR not equals to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.notEquals=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR in DEFAULT_TRANSACTION_AMOUNT_CR or UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.in=" + DEFAULT_TRANSACTION_AMOUNT_CR + "," + UPDATED_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR equals to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.in=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is not null
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.specified=true");

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is null
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.specified=false");
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is greater than or equal to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.greaterThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is greater than or equal to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.greaterThanOrEqual=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is less than or equal to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.lessThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is less than or equal to SMALLER_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.lessThanOrEqual=" + SMALLER_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsLessThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is less than DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.lessThan=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is less than UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.lessThan=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionAmountCRIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is greater than DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionAmountCR.greaterThan=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherSupplierList where transactionAmountCR is greater than SMALLER_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionAmountCR.greaterThan=" + SMALLER_TRANSACTION_AMOUNT_CR);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByLocationIsEqualToSomething() throws Exception {
        // Get already existing entity
        Location location = cashReceiptVoucherSupplier.getLocation();
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);
        Long locationId = location.getId();

        // Get all the cashReceiptVoucherSupplierList where location equals to locationId
        defaultCashReceiptVoucherSupplierShouldBeFound("locationId.equals=" + locationId);

        // Get all the cashReceiptVoucherSupplierList where location equals to locationId + 1
        defaultCashReceiptVoucherSupplierShouldNotBeFound("locationId.equals=" + (locationId + 1));
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByTransactionTypeIsEqualToSomething() throws Exception {
        // Get already existing entity
        TransactionType transactionType = cashReceiptVoucherSupplier.getTransactionType();
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);
        Long transactionTypeId = transactionType.getId();

        // Get all the cashReceiptVoucherSupplierList where transactionType equals to transactionTypeId
        defaultCashReceiptVoucherSupplierShouldBeFound("transactionTypeId.equals=" + transactionTypeId);

        // Get all the cashReceiptVoucherSupplierList where transactionType equals to transactionTypeId + 1
        defaultCashReceiptVoucherSupplierShouldNotBeFound("transactionTypeId.equals=" + (transactionTypeId + 1));
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersBySupplierIsEqualToSomething() throws Exception {
        // Get already existing entity
        Supplier supplier = cashReceiptVoucherSupplier.getSupplier();
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);
        Long supplierId = supplier.getId();

        // Get all the cashReceiptVoucherSupplierList where supplier equals to supplierId
        defaultCashReceiptVoucherSupplierShouldBeFound("supplierId.equals=" + supplierId);

        // Get all the cashReceiptVoucherSupplierList where supplier equals to supplierId + 1
        defaultCashReceiptVoucherSupplierShouldNotBeFound("supplierId.equals=" + (supplierId + 1));
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherSuppliersByHistoryIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);
        DocumentHistory history = DocumentHistoryResourceIT.createEntity(em);
        em.persist(history);
        em.flush();
        cashReceiptVoucherSupplier.setHistory(history);
        cashReceiptVoucherSupplierRepository.saveAndFlush(cashReceiptVoucherSupplier);
        Long historyId = history.getId();

        // Get all the cashReceiptVoucherSupplierList where history equals to historyId
        defaultCashReceiptVoucherSupplierShouldBeFound("historyId.equals=" + historyId);

        // Get all the cashReceiptVoucherSupplierList where history equals to historyId + 1
        defaultCashReceiptVoucherSupplierShouldNotBeFound("historyId.equals=" + (historyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultCashReceiptVoucherSupplierShouldBeFound(String filter) throws Exception {
        restCashReceiptVoucherSupplierMockMvc.perform(get("/api/cash-receipt-voucher-suppliers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashReceiptVoucherSupplier.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionDescription").value(hasItem(DEFAULT_TRANSACTION_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].transactionAmountDR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_DR.intValue())))
            .andExpect(jsonPath("$.[*].transactionAmountCR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_CR.intValue())));

        // Check, that the count call also returns 1
        restCashReceiptVoucherSupplierMockMvc.perform(get("/api/cash-receipt-voucher-suppliers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultCashReceiptVoucherSupplierShouldNotBeFound(String filter) throws Exception {
        restCashReceiptVoucherSupplierMockMvc.perform(get("/api/cash-receipt-voucher-suppliers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCashReceiptVoucherSupplierMockMvc.perform(get("/api/cash-receipt-voucher-suppliers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingCashReceiptVoucherSupplier() throws Exception {
        // Get the cashReceiptVoucherSupplier
        restCashReceiptVoucherSupplierMockMvc.perform(get("/api/cash-receipt-voucher-suppliers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashReceiptVoucherSupplier() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierService.save(cashReceiptVoucherSupplier);

        int databaseSizeBeforeUpdate = cashReceiptVoucherSupplierRepository.findAll().size();

        // Update the cashReceiptVoucherSupplier
        CashReceiptVoucherSupplier updatedCashReceiptVoucherSupplier = cashReceiptVoucherSupplierRepository.findById(cashReceiptVoucherSupplier.getId()).get();
        // Disconnect from session so that the updates on updatedCashReceiptVoucherSupplier are not directly saved in db
        em.detach(updatedCashReceiptVoucherSupplier);
        updatedCashReceiptVoucherSupplier
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .transactionDescription(UPDATED_TRANSACTION_DESCRIPTION)
            .transactionAmountDR(UPDATED_TRANSACTION_AMOUNT_DR)
            .transactionAmountCR(UPDATED_TRANSACTION_AMOUNT_CR);

        restCashReceiptVoucherSupplierMockMvc.perform(put("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashReceiptVoucherSupplier)))
            .andExpect(status().isOk());

        // Validate the CashReceiptVoucherSupplier in the database
        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeUpdate);
        CashReceiptVoucherSupplier testCashReceiptVoucherSupplier = cashReceiptVoucherSupplierList.get(cashReceiptVoucherSupplierList.size() - 1);
        assertThat(testCashReceiptVoucherSupplier.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
        assertThat(testCashReceiptVoucherSupplier.getTransactionDescription()).isEqualTo(UPDATED_TRANSACTION_DESCRIPTION);
        assertThat(testCashReceiptVoucherSupplier.getTransactionAmountDR()).isEqualTo(UPDATED_TRANSACTION_AMOUNT_DR);
        assertThat(testCashReceiptVoucherSupplier.getTransactionAmountCR()).isEqualTo(UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void updateNonExistingCashReceiptVoucherSupplier() throws Exception {
        int databaseSizeBeforeUpdate = cashReceiptVoucherSupplierRepository.findAll().size();

        // Create the CashReceiptVoucherSupplier

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCashReceiptVoucherSupplierMockMvc.perform(put("/api/cash-receipt-voucher-suppliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherSupplier)))
            .andExpect(status().isBadRequest());

        // Validate the CashReceiptVoucherSupplier in the database
        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCashReceiptVoucherSupplier() throws Exception {
        // Initialize the database
        cashReceiptVoucherSupplierService.save(cashReceiptVoucherSupplier);

        int databaseSizeBeforeDelete = cashReceiptVoucherSupplierRepository.findAll().size();

        // Delete the cashReceiptVoucherSupplier
        restCashReceiptVoucherSupplierMockMvc.perform(delete("/api/cash-receipt-voucher-suppliers/{id}", cashReceiptVoucherSupplier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CashReceiptVoucherSupplier> cashReceiptVoucherSupplierList = cashReceiptVoucherSupplierRepository.findAll();
        assertThat(cashReceiptVoucherSupplierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
