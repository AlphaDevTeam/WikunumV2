package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.WikunumV2App;
import com.alphadevs.sales.domain.CashReceiptVoucherCustomer;
import com.alphadevs.sales.domain.Location;
import com.alphadevs.sales.domain.TransactionType;
import com.alphadevs.sales.domain.Customer;
import com.alphadevs.sales.domain.DocumentHistory;
import com.alphadevs.sales.repository.CashReceiptVoucherCustomerRepository;
import com.alphadevs.sales.service.CashReceiptVoucherCustomerService;
import com.alphadevs.sales.web.rest.errors.ExceptionTranslator;
import com.alphadevs.sales.service.dto.CashReceiptVoucherCustomerCriteria;
import com.alphadevs.sales.service.CashReceiptVoucherCustomerQueryService;

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
 * Integration tests for the {@link CashReceiptVoucherCustomerResource} REST controller.
 */
@SpringBootTest(classes = WikunumV2App.class)
public class CashReceiptVoucherCustomerResourceIT {

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
    private CashReceiptVoucherCustomerRepository cashReceiptVoucherCustomerRepository;

    @Autowired
    private CashReceiptVoucherCustomerService cashReceiptVoucherCustomerService;

    @Autowired
    private CashReceiptVoucherCustomerQueryService cashReceiptVoucherCustomerQueryService;

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

    private MockMvc restCashReceiptVoucherCustomerMockMvc;

    private CashReceiptVoucherCustomer cashReceiptVoucherCustomer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashReceiptVoucherCustomerResource cashReceiptVoucherCustomerResource = new CashReceiptVoucherCustomerResource(cashReceiptVoucherCustomerService, cashReceiptVoucherCustomerQueryService);
        this.restCashReceiptVoucherCustomerMockMvc = MockMvcBuilders.standaloneSetup(cashReceiptVoucherCustomerResource)
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
    public static CashReceiptVoucherCustomer createEntity(EntityManager em) {
        CashReceiptVoucherCustomer cashReceiptVoucherCustomer = new CashReceiptVoucherCustomer()
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
        cashReceiptVoucherCustomer.setLocation(location);
        // Add required entity
        TransactionType transactionType;
        if (TestUtil.findAll(em, TransactionType.class).isEmpty()) {
            transactionType = TransactionTypeResourceIT.createEntity(em);
            em.persist(transactionType);
            em.flush();
        } else {
            transactionType = TestUtil.findAll(em, TransactionType.class).get(0);
        }
        cashReceiptVoucherCustomer.setTransactionType(transactionType);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        cashReceiptVoucherCustomer.setCustomer(customer);
        return cashReceiptVoucherCustomer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CashReceiptVoucherCustomer createUpdatedEntity(EntityManager em) {
        CashReceiptVoucherCustomer cashReceiptVoucherCustomer = new CashReceiptVoucherCustomer()
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
        cashReceiptVoucherCustomer.setLocation(location);
        // Add required entity
        TransactionType transactionType;
        if (TestUtil.findAll(em, TransactionType.class).isEmpty()) {
            transactionType = TransactionTypeResourceIT.createUpdatedEntity(em);
            em.persist(transactionType);
            em.flush();
        } else {
            transactionType = TestUtil.findAll(em, TransactionType.class).get(0);
        }
        cashReceiptVoucherCustomer.setTransactionType(transactionType);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createUpdatedEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        cashReceiptVoucherCustomer.setCustomer(customer);
        return cashReceiptVoucherCustomer;
    }

    @BeforeEach
    public void initTest() {
        cashReceiptVoucherCustomer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashReceiptVoucherCustomer() throws Exception {
        int databaseSizeBeforeCreate = cashReceiptVoucherCustomerRepository.findAll().size();

        // Create the CashReceiptVoucherCustomer
        restCashReceiptVoucherCustomerMockMvc.perform(post("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherCustomer)))
            .andExpect(status().isCreated());

        // Validate the CashReceiptVoucherCustomer in the database
        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeCreate + 1);
        CashReceiptVoucherCustomer testCashReceiptVoucherCustomer = cashReceiptVoucherCustomerList.get(cashReceiptVoucherCustomerList.size() - 1);
        assertThat(testCashReceiptVoucherCustomer.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
        assertThat(testCashReceiptVoucherCustomer.getTransactionDescription()).isEqualTo(DEFAULT_TRANSACTION_DESCRIPTION);
        assertThat(testCashReceiptVoucherCustomer.getTransactionAmountDR()).isEqualTo(DEFAULT_TRANSACTION_AMOUNT_DR);
        assertThat(testCashReceiptVoucherCustomer.getTransactionAmountCR()).isEqualTo(DEFAULT_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void createCashReceiptVoucherCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashReceiptVoucherCustomerRepository.findAll().size();

        // Create the CashReceiptVoucherCustomer with an existing ID
        cashReceiptVoucherCustomer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashReceiptVoucherCustomerMockMvc.perform(post("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherCustomer)))
            .andExpect(status().isBadRequest());

        // Validate the CashReceiptVoucherCustomer in the database
        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTransactionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherCustomerRepository.findAll().size();
        // set the field null
        cashReceiptVoucherCustomer.setTransactionDate(null);

        // Create the CashReceiptVoucherCustomer, which fails.

        restCashReceiptVoucherCustomerMockMvc.perform(post("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherCustomer)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherCustomerRepository.findAll().size();
        // set the field null
        cashReceiptVoucherCustomer.setTransactionDescription(null);

        // Create the CashReceiptVoucherCustomer, which fails.

        restCashReceiptVoucherCustomerMockMvc.perform(post("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherCustomer)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionAmountDRIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherCustomerRepository.findAll().size();
        // set the field null
        cashReceiptVoucherCustomer.setTransactionAmountDR(null);

        // Create the CashReceiptVoucherCustomer, which fails.

        restCashReceiptVoucherCustomerMockMvc.perform(post("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherCustomer)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionAmountCRIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashReceiptVoucherCustomerRepository.findAll().size();
        // set the field null
        cashReceiptVoucherCustomer.setTransactionAmountCR(null);

        // Create the CashReceiptVoucherCustomer, which fails.

        restCashReceiptVoucherCustomerMockMvc.perform(post("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherCustomer)))
            .andExpect(status().isBadRequest());

        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomers() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList
        restCashReceiptVoucherCustomerMockMvc.perform(get("/api/cash-receipt-voucher-customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashReceiptVoucherCustomer.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionDescription").value(hasItem(DEFAULT_TRANSACTION_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].transactionAmountDR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_DR.intValue())))
            .andExpect(jsonPath("$.[*].transactionAmountCR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_CR.intValue())));
    }
    
    @Test
    @Transactional
    public void getCashReceiptVoucherCustomer() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get the cashReceiptVoucherCustomer
        restCashReceiptVoucherCustomerMockMvc.perform(get("/api/cash-receipt-voucher-customers/{id}", cashReceiptVoucherCustomer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashReceiptVoucherCustomer.getId().intValue()))
            .andExpect(jsonPath("$.transactionDate").value(DEFAULT_TRANSACTION_DATE.toString()))
            .andExpect(jsonPath("$.transactionDescription").value(DEFAULT_TRANSACTION_DESCRIPTION))
            .andExpect(jsonPath("$.transactionAmountDR").value(DEFAULT_TRANSACTION_AMOUNT_DR.intValue()))
            .andExpect(jsonPath("$.transactionAmountCR").value(DEFAULT_TRANSACTION_AMOUNT_CR.intValue()));
    }


    @Test
    @Transactional
    public void getCashReceiptVoucherCustomersByIdFiltering() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        Long id = cashReceiptVoucherCustomer.getId();

        defaultCashReceiptVoucherCustomerShouldBeFound("id.equals=" + id);
        defaultCashReceiptVoucherCustomerShouldNotBeFound("id.notEquals=" + id);

        defaultCashReceiptVoucherCustomerShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultCashReceiptVoucherCustomerShouldNotBeFound("id.greaterThan=" + id);

        defaultCashReceiptVoucherCustomerShouldBeFound("id.lessThanOrEqual=" + id);
        defaultCashReceiptVoucherCustomerShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate equals to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.equals=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherCustomerList where transactionDate equals to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.equals=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate not equals to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.notEquals=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherCustomerList where transactionDate not equals to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.notEquals=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate in DEFAULT_TRANSACTION_DATE or UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.in=" + DEFAULT_TRANSACTION_DATE + "," + UPDATED_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherCustomerList where transactionDate equals to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.in=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is not null
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.specified=true");

        // Get all the cashReceiptVoucherCustomerList where transactionDate is null
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is greater than or equal to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.greaterThanOrEqual=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is greater than or equal to UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.greaterThanOrEqual=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is less than or equal to DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.lessThanOrEqual=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is less than or equal to SMALLER_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.lessThanOrEqual=" + SMALLER_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsLessThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is less than DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.lessThan=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is less than UPDATED_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.lessThan=" + UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is greater than DEFAULT_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDate.greaterThan=" + DEFAULT_TRANSACTION_DATE);

        // Get all the cashReceiptVoucherCustomerList where transactionDate is greater than SMALLER_TRANSACTION_DATE
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDate.greaterThan=" + SMALLER_TRANSACTION_DATE);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription equals to DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDescription.equals=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription equals to UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDescription.equals=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDescriptionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription not equals to DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDescription.notEquals=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription not equals to UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDescription.notEquals=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription in DEFAULT_TRANSACTION_DESCRIPTION or UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDescription.in=" + DEFAULT_TRANSACTION_DESCRIPTION + "," + UPDATED_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription equals to UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDescription.in=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription is not null
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDescription.specified=true");

        // Get all the cashReceiptVoucherCustomerList where transactionDescription is null
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDescription.specified=false");
    }
                @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDescriptionContainsSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription contains DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDescription.contains=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription contains UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDescription.contains=" + UPDATED_TRANSACTION_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionDescriptionNotContainsSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription does not contain DEFAULT_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionDescription.doesNotContain=" + DEFAULT_TRANSACTION_DESCRIPTION);

        // Get all the cashReceiptVoucherCustomerList where transactionDescription does not contain UPDATED_TRANSACTION_DESCRIPTION
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionDescription.doesNotContain=" + UPDATED_TRANSACTION_DESCRIPTION);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR equals to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.equals=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR equals to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.equals=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR not equals to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.notEquals=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR not equals to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.notEquals=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR in DEFAULT_TRANSACTION_AMOUNT_DR or UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.in=" + DEFAULT_TRANSACTION_AMOUNT_DR + "," + UPDATED_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR equals to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.in=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is not null
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.specified=true");

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is null
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.specified=false");
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is greater than or equal to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.greaterThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is greater than or equal to UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.greaterThanOrEqual=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is less than or equal to DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.lessThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is less than or equal to SMALLER_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.lessThanOrEqual=" + SMALLER_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsLessThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is less than DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.lessThan=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is less than UPDATED_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.lessThan=" + UPDATED_TRANSACTION_AMOUNT_DR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountDRIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is greater than DEFAULT_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountDR.greaterThan=" + DEFAULT_TRANSACTION_AMOUNT_DR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountDR is greater than SMALLER_TRANSACTION_AMOUNT_DR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountDR.greaterThan=" + SMALLER_TRANSACTION_AMOUNT_DR);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR equals to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.equals=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR equals to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.equals=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR not equals to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.notEquals=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR not equals to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.notEquals=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsInShouldWork() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR in DEFAULT_TRANSACTION_AMOUNT_CR or UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.in=" + DEFAULT_TRANSACTION_AMOUNT_CR + "," + UPDATED_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR equals to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.in=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsNullOrNotNull() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is not null
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.specified=true");

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is null
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.specified=false");
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is greater than or equal to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.greaterThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is greater than or equal to UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.greaterThanOrEqual=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is less than or equal to DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.lessThanOrEqual=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is less than or equal to SMALLER_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.lessThanOrEqual=" + SMALLER_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsLessThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is less than DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.lessThan=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is less than UPDATED_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.lessThan=" + UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionAmountCRIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is greater than DEFAULT_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionAmountCR.greaterThan=" + DEFAULT_TRANSACTION_AMOUNT_CR);

        // Get all the cashReceiptVoucherCustomerList where transactionAmountCR is greater than SMALLER_TRANSACTION_AMOUNT_CR
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionAmountCR.greaterThan=" + SMALLER_TRANSACTION_AMOUNT_CR);
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByLocationIsEqualToSomething() throws Exception {
        // Get already existing entity
        Location location = cashReceiptVoucherCustomer.getLocation();
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);
        Long locationId = location.getId();

        // Get all the cashReceiptVoucherCustomerList where location equals to locationId
        defaultCashReceiptVoucherCustomerShouldBeFound("locationId.equals=" + locationId);

        // Get all the cashReceiptVoucherCustomerList where location equals to locationId + 1
        defaultCashReceiptVoucherCustomerShouldNotBeFound("locationId.equals=" + (locationId + 1));
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByTransactionTypeIsEqualToSomething() throws Exception {
        // Get already existing entity
        TransactionType transactionType = cashReceiptVoucherCustomer.getTransactionType();
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);
        Long transactionTypeId = transactionType.getId();

        // Get all the cashReceiptVoucherCustomerList where transactionType equals to transactionTypeId
        defaultCashReceiptVoucherCustomerShouldBeFound("transactionTypeId.equals=" + transactionTypeId);

        // Get all the cashReceiptVoucherCustomerList where transactionType equals to transactionTypeId + 1
        defaultCashReceiptVoucherCustomerShouldNotBeFound("transactionTypeId.equals=" + (transactionTypeId + 1));
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByCustomerIsEqualToSomething() throws Exception {
        // Get already existing entity
        Customer customer = cashReceiptVoucherCustomer.getCustomer();
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);
        Long customerId = customer.getId();

        // Get all the cashReceiptVoucherCustomerList where customer equals to customerId
        defaultCashReceiptVoucherCustomerShouldBeFound("customerId.equals=" + customerId);

        // Get all the cashReceiptVoucherCustomerList where customer equals to customerId + 1
        defaultCashReceiptVoucherCustomerShouldNotBeFound("customerId.equals=" + (customerId + 1));
    }


    @Test
    @Transactional
    public void getAllCashReceiptVoucherCustomersByHistoryIsEqualToSomething() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);
        DocumentHistory history = DocumentHistoryResourceIT.createEntity(em);
        em.persist(history);
        em.flush();
        cashReceiptVoucherCustomer.setHistory(history);
        cashReceiptVoucherCustomerRepository.saveAndFlush(cashReceiptVoucherCustomer);
        Long historyId = history.getId();

        // Get all the cashReceiptVoucherCustomerList where history equals to historyId
        defaultCashReceiptVoucherCustomerShouldBeFound("historyId.equals=" + historyId);

        // Get all the cashReceiptVoucherCustomerList where history equals to historyId + 1
        defaultCashReceiptVoucherCustomerShouldNotBeFound("historyId.equals=" + (historyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultCashReceiptVoucherCustomerShouldBeFound(String filter) throws Exception {
        restCashReceiptVoucherCustomerMockMvc.perform(get("/api/cash-receipt-voucher-customers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashReceiptVoucherCustomer.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionDescription").value(hasItem(DEFAULT_TRANSACTION_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].transactionAmountDR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_DR.intValue())))
            .andExpect(jsonPath("$.[*].transactionAmountCR").value(hasItem(DEFAULT_TRANSACTION_AMOUNT_CR.intValue())));

        // Check, that the count call also returns 1
        restCashReceiptVoucherCustomerMockMvc.perform(get("/api/cash-receipt-voucher-customers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultCashReceiptVoucherCustomerShouldNotBeFound(String filter) throws Exception {
        restCashReceiptVoucherCustomerMockMvc.perform(get("/api/cash-receipt-voucher-customers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCashReceiptVoucherCustomerMockMvc.perform(get("/api/cash-receipt-voucher-customers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingCashReceiptVoucherCustomer() throws Exception {
        // Get the cashReceiptVoucherCustomer
        restCashReceiptVoucherCustomerMockMvc.perform(get("/api/cash-receipt-voucher-customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashReceiptVoucherCustomer() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerService.save(cashReceiptVoucherCustomer);

        int databaseSizeBeforeUpdate = cashReceiptVoucherCustomerRepository.findAll().size();

        // Update the cashReceiptVoucherCustomer
        CashReceiptVoucherCustomer updatedCashReceiptVoucherCustomer = cashReceiptVoucherCustomerRepository.findById(cashReceiptVoucherCustomer.getId()).get();
        // Disconnect from session so that the updates on updatedCashReceiptVoucherCustomer are not directly saved in db
        em.detach(updatedCashReceiptVoucherCustomer);
        updatedCashReceiptVoucherCustomer
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .transactionDescription(UPDATED_TRANSACTION_DESCRIPTION)
            .transactionAmountDR(UPDATED_TRANSACTION_AMOUNT_DR)
            .transactionAmountCR(UPDATED_TRANSACTION_AMOUNT_CR);

        restCashReceiptVoucherCustomerMockMvc.perform(put("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashReceiptVoucherCustomer)))
            .andExpect(status().isOk());

        // Validate the CashReceiptVoucherCustomer in the database
        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeUpdate);
        CashReceiptVoucherCustomer testCashReceiptVoucherCustomer = cashReceiptVoucherCustomerList.get(cashReceiptVoucherCustomerList.size() - 1);
        assertThat(testCashReceiptVoucherCustomer.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
        assertThat(testCashReceiptVoucherCustomer.getTransactionDescription()).isEqualTo(UPDATED_TRANSACTION_DESCRIPTION);
        assertThat(testCashReceiptVoucherCustomer.getTransactionAmountDR()).isEqualTo(UPDATED_TRANSACTION_AMOUNT_DR);
        assertThat(testCashReceiptVoucherCustomer.getTransactionAmountCR()).isEqualTo(UPDATED_TRANSACTION_AMOUNT_CR);
    }

    @Test
    @Transactional
    public void updateNonExistingCashReceiptVoucherCustomer() throws Exception {
        int databaseSizeBeforeUpdate = cashReceiptVoucherCustomerRepository.findAll().size();

        // Create the CashReceiptVoucherCustomer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCashReceiptVoucherCustomerMockMvc.perform(put("/api/cash-receipt-voucher-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashReceiptVoucherCustomer)))
            .andExpect(status().isBadRequest());

        // Validate the CashReceiptVoucherCustomer in the database
        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCashReceiptVoucherCustomer() throws Exception {
        // Initialize the database
        cashReceiptVoucherCustomerService.save(cashReceiptVoucherCustomer);

        int databaseSizeBeforeDelete = cashReceiptVoucherCustomerRepository.findAll().size();

        // Delete the cashReceiptVoucherCustomer
        restCashReceiptVoucherCustomerMockMvc.perform(delete("/api/cash-receipt-voucher-customers/{id}", cashReceiptVoucherCustomer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CashReceiptVoucherCustomer> cashReceiptVoucherCustomerList = cashReceiptVoucherCustomerRepository.findAll();
        assertThat(cashReceiptVoucherCustomerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
