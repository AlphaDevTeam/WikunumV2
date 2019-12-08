package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.WikunumV2App;
import com.alphadevs.sales.domain.Company;
import com.alphadevs.sales.domain.DocumentHistory;
import com.alphadevs.sales.repository.CompanyRepository;
import com.alphadevs.sales.service.CompanyService;
import com.alphadevs.sales.web.rest.errors.ExceptionTranslator;
import com.alphadevs.sales.service.dto.CompanyCriteria;
import com.alphadevs.sales.service.CompanyQueryService;

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
 * Integration tests for the {@link CompanyResource} REST controller.
 */
@SpringBootTest(classes = WikunumV2App.class)
public class CompanyResourceIT {

    private static final String DEFAULT_COMPANY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_REG_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_REG_NUMBER = "BBBBBBBBBB";

    private static final Double DEFAULT_RATING = 1D;
    private static final Double UPDATED_RATING = 2D;
    private static final Double SMALLER_RATING = 1D - 1D;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyQueryService companyQueryService;

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

    private MockMvc restCompanyMockMvc;

    private Company company;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyResource companyResource = new CompanyResource(companyService, companyQueryService);
        this.restCompanyMockMvc = MockMvcBuilders.standaloneSetup(companyResource)
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
    public static Company createEntity(EntityManager em) {
        Company company = new Company()
            .companyCode(DEFAULT_COMPANY_CODE)
            .companyName(DEFAULT_COMPANY_NAME)
            .companyRegNumber(DEFAULT_COMPANY_REG_NUMBER)
            .rating(DEFAULT_RATING);
        return company;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Company createUpdatedEntity(EntityManager em) {
        Company company = new Company()
            .companyCode(UPDATED_COMPANY_CODE)
            .companyName(UPDATED_COMPANY_NAME)
            .companyRegNumber(UPDATED_COMPANY_REG_NUMBER)
            .rating(UPDATED_RATING);
        return company;
    }

    @BeforeEach
    public void initTest() {
        company = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompany() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company
        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isCreated());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate + 1);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getCompanyCode()).isEqualTo(DEFAULT_COMPANY_CODE);
        assertThat(testCompany.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testCompany.getCompanyRegNumber()).isEqualTo(DEFAULT_COMPANY_REG_NUMBER);
        assertThat(testCompany.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company with an existing ID
        company.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCompanyCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = companyRepository.findAll().size();
        // set the field null
        company.setCompanyCode(null);

        // Create the Company, which fails.

        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCompanyNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = companyRepository.findAll().size();
        // set the field null
        company.setCompanyName(null);

        // Create the Company, which fails.

        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCompanyRegNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = companyRepository.findAll().size();
        // set the field null
        company.setCompanyRegNumber(null);

        // Create the Company, which fails.

        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCompanies() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList
        restCompanyMockMvc.perform(get("/api/companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(company.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyCode").value(hasItem(DEFAULT_COMPANY_CODE)))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].companyRegNumber").value(hasItem(DEFAULT_COMPANY_REG_NUMBER)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCompany() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get the company
        restCompanyMockMvc.perform(get("/api/companies/{id}", company.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(company.getId().intValue()))
            .andExpect(jsonPath("$.companyCode").value(DEFAULT_COMPANY_CODE))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME))
            .andExpect(jsonPath("$.companyRegNumber").value(DEFAULT_COMPANY_REG_NUMBER))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()));
    }


    @Test
    @Transactional
    public void getCompaniesByIdFiltering() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        Long id = company.getId();

        defaultCompanyShouldBeFound("id.equals=" + id);
        defaultCompanyShouldNotBeFound("id.notEquals=" + id);

        defaultCompanyShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultCompanyShouldNotBeFound("id.greaterThan=" + id);

        defaultCompanyShouldBeFound("id.lessThanOrEqual=" + id);
        defaultCompanyShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllCompaniesByCompanyCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyCode equals to DEFAULT_COMPANY_CODE
        defaultCompanyShouldBeFound("companyCode.equals=" + DEFAULT_COMPANY_CODE);

        // Get all the companyList where companyCode equals to UPDATED_COMPANY_CODE
        defaultCompanyShouldNotBeFound("companyCode.equals=" + UPDATED_COMPANY_CODE);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyCodeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyCode not equals to DEFAULT_COMPANY_CODE
        defaultCompanyShouldNotBeFound("companyCode.notEquals=" + DEFAULT_COMPANY_CODE);

        // Get all the companyList where companyCode not equals to UPDATED_COMPANY_CODE
        defaultCompanyShouldBeFound("companyCode.notEquals=" + UPDATED_COMPANY_CODE);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyCodeIsInShouldWork() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyCode in DEFAULT_COMPANY_CODE or UPDATED_COMPANY_CODE
        defaultCompanyShouldBeFound("companyCode.in=" + DEFAULT_COMPANY_CODE + "," + UPDATED_COMPANY_CODE);

        // Get all the companyList where companyCode equals to UPDATED_COMPANY_CODE
        defaultCompanyShouldNotBeFound("companyCode.in=" + UPDATED_COMPANY_CODE);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyCode is not null
        defaultCompanyShouldBeFound("companyCode.specified=true");

        // Get all the companyList where companyCode is null
        defaultCompanyShouldNotBeFound("companyCode.specified=false");
    }
                @Test
    @Transactional
    public void getAllCompaniesByCompanyCodeContainsSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyCode contains DEFAULT_COMPANY_CODE
        defaultCompanyShouldBeFound("companyCode.contains=" + DEFAULT_COMPANY_CODE);

        // Get all the companyList where companyCode contains UPDATED_COMPANY_CODE
        defaultCompanyShouldNotBeFound("companyCode.contains=" + UPDATED_COMPANY_CODE);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyCodeNotContainsSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyCode does not contain DEFAULT_COMPANY_CODE
        defaultCompanyShouldNotBeFound("companyCode.doesNotContain=" + DEFAULT_COMPANY_CODE);

        // Get all the companyList where companyCode does not contain UPDATED_COMPANY_CODE
        defaultCompanyShouldBeFound("companyCode.doesNotContain=" + UPDATED_COMPANY_CODE);
    }


    @Test
    @Transactional
    public void getAllCompaniesByCompanyNameIsEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyName equals to DEFAULT_COMPANY_NAME
        defaultCompanyShouldBeFound("companyName.equals=" + DEFAULT_COMPANY_NAME);

        // Get all the companyList where companyName equals to UPDATED_COMPANY_NAME
        defaultCompanyShouldNotBeFound("companyName.equals=" + UPDATED_COMPANY_NAME);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyName not equals to DEFAULT_COMPANY_NAME
        defaultCompanyShouldNotBeFound("companyName.notEquals=" + DEFAULT_COMPANY_NAME);

        // Get all the companyList where companyName not equals to UPDATED_COMPANY_NAME
        defaultCompanyShouldBeFound("companyName.notEquals=" + UPDATED_COMPANY_NAME);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyNameIsInShouldWork() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyName in DEFAULT_COMPANY_NAME or UPDATED_COMPANY_NAME
        defaultCompanyShouldBeFound("companyName.in=" + DEFAULT_COMPANY_NAME + "," + UPDATED_COMPANY_NAME);

        // Get all the companyList where companyName equals to UPDATED_COMPANY_NAME
        defaultCompanyShouldNotBeFound("companyName.in=" + UPDATED_COMPANY_NAME);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyName is not null
        defaultCompanyShouldBeFound("companyName.specified=true");

        // Get all the companyList where companyName is null
        defaultCompanyShouldNotBeFound("companyName.specified=false");
    }
                @Test
    @Transactional
    public void getAllCompaniesByCompanyNameContainsSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyName contains DEFAULT_COMPANY_NAME
        defaultCompanyShouldBeFound("companyName.contains=" + DEFAULT_COMPANY_NAME);

        // Get all the companyList where companyName contains UPDATED_COMPANY_NAME
        defaultCompanyShouldNotBeFound("companyName.contains=" + UPDATED_COMPANY_NAME);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyNameNotContainsSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyName does not contain DEFAULT_COMPANY_NAME
        defaultCompanyShouldNotBeFound("companyName.doesNotContain=" + DEFAULT_COMPANY_NAME);

        // Get all the companyList where companyName does not contain UPDATED_COMPANY_NAME
        defaultCompanyShouldBeFound("companyName.doesNotContain=" + UPDATED_COMPANY_NAME);
    }


    @Test
    @Transactional
    public void getAllCompaniesByCompanyRegNumberIsEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyRegNumber equals to DEFAULT_COMPANY_REG_NUMBER
        defaultCompanyShouldBeFound("companyRegNumber.equals=" + DEFAULT_COMPANY_REG_NUMBER);

        // Get all the companyList where companyRegNumber equals to UPDATED_COMPANY_REG_NUMBER
        defaultCompanyShouldNotBeFound("companyRegNumber.equals=" + UPDATED_COMPANY_REG_NUMBER);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyRegNumberIsNotEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyRegNumber not equals to DEFAULT_COMPANY_REG_NUMBER
        defaultCompanyShouldNotBeFound("companyRegNumber.notEquals=" + DEFAULT_COMPANY_REG_NUMBER);

        // Get all the companyList where companyRegNumber not equals to UPDATED_COMPANY_REG_NUMBER
        defaultCompanyShouldBeFound("companyRegNumber.notEquals=" + UPDATED_COMPANY_REG_NUMBER);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyRegNumberIsInShouldWork() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyRegNumber in DEFAULT_COMPANY_REG_NUMBER or UPDATED_COMPANY_REG_NUMBER
        defaultCompanyShouldBeFound("companyRegNumber.in=" + DEFAULT_COMPANY_REG_NUMBER + "," + UPDATED_COMPANY_REG_NUMBER);

        // Get all the companyList where companyRegNumber equals to UPDATED_COMPANY_REG_NUMBER
        defaultCompanyShouldNotBeFound("companyRegNumber.in=" + UPDATED_COMPANY_REG_NUMBER);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyRegNumberIsNullOrNotNull() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyRegNumber is not null
        defaultCompanyShouldBeFound("companyRegNumber.specified=true");

        // Get all the companyList where companyRegNumber is null
        defaultCompanyShouldNotBeFound("companyRegNumber.specified=false");
    }
                @Test
    @Transactional
    public void getAllCompaniesByCompanyRegNumberContainsSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyRegNumber contains DEFAULT_COMPANY_REG_NUMBER
        defaultCompanyShouldBeFound("companyRegNumber.contains=" + DEFAULT_COMPANY_REG_NUMBER);

        // Get all the companyList where companyRegNumber contains UPDATED_COMPANY_REG_NUMBER
        defaultCompanyShouldNotBeFound("companyRegNumber.contains=" + UPDATED_COMPANY_REG_NUMBER);
    }

    @Test
    @Transactional
    public void getAllCompaniesByCompanyRegNumberNotContainsSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where companyRegNumber does not contain DEFAULT_COMPANY_REG_NUMBER
        defaultCompanyShouldNotBeFound("companyRegNumber.doesNotContain=" + DEFAULT_COMPANY_REG_NUMBER);

        // Get all the companyList where companyRegNumber does not contain UPDATED_COMPANY_REG_NUMBER
        defaultCompanyShouldBeFound("companyRegNumber.doesNotContain=" + UPDATED_COMPANY_REG_NUMBER);
    }


    @Test
    @Transactional
    public void getAllCompaniesByRatingIsEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating equals to DEFAULT_RATING
        defaultCompanyShouldBeFound("rating.equals=" + DEFAULT_RATING);

        // Get all the companyList where rating equals to UPDATED_RATING
        defaultCompanyShouldNotBeFound("rating.equals=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllCompaniesByRatingIsNotEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating not equals to DEFAULT_RATING
        defaultCompanyShouldNotBeFound("rating.notEquals=" + DEFAULT_RATING);

        // Get all the companyList where rating not equals to UPDATED_RATING
        defaultCompanyShouldBeFound("rating.notEquals=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllCompaniesByRatingIsInShouldWork() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating in DEFAULT_RATING or UPDATED_RATING
        defaultCompanyShouldBeFound("rating.in=" + DEFAULT_RATING + "," + UPDATED_RATING);

        // Get all the companyList where rating equals to UPDATED_RATING
        defaultCompanyShouldNotBeFound("rating.in=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllCompaniesByRatingIsNullOrNotNull() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating is not null
        defaultCompanyShouldBeFound("rating.specified=true");

        // Get all the companyList where rating is null
        defaultCompanyShouldNotBeFound("rating.specified=false");
    }

    @Test
    @Transactional
    public void getAllCompaniesByRatingIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating is greater than or equal to DEFAULT_RATING
        defaultCompanyShouldBeFound("rating.greaterThanOrEqual=" + DEFAULT_RATING);

        // Get all the companyList where rating is greater than or equal to UPDATED_RATING
        defaultCompanyShouldNotBeFound("rating.greaterThanOrEqual=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllCompaniesByRatingIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating is less than or equal to DEFAULT_RATING
        defaultCompanyShouldBeFound("rating.lessThanOrEqual=" + DEFAULT_RATING);

        // Get all the companyList where rating is less than or equal to SMALLER_RATING
        defaultCompanyShouldNotBeFound("rating.lessThanOrEqual=" + SMALLER_RATING);
    }

    @Test
    @Transactional
    public void getAllCompaniesByRatingIsLessThanSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating is less than DEFAULT_RATING
        defaultCompanyShouldNotBeFound("rating.lessThan=" + DEFAULT_RATING);

        // Get all the companyList where rating is less than UPDATED_RATING
        defaultCompanyShouldBeFound("rating.lessThan=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllCompaniesByRatingIsGreaterThanSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList where rating is greater than DEFAULT_RATING
        defaultCompanyShouldNotBeFound("rating.greaterThan=" + DEFAULT_RATING);

        // Get all the companyList where rating is greater than SMALLER_RATING
        defaultCompanyShouldBeFound("rating.greaterThan=" + SMALLER_RATING);
    }


    @Test
    @Transactional
    public void getAllCompaniesByHistoryIsEqualToSomething() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);
        DocumentHistory history = DocumentHistoryResourceIT.createEntity(em);
        em.persist(history);
        em.flush();
        company.setHistory(history);
        companyRepository.saveAndFlush(company);
        Long historyId = history.getId();

        // Get all the companyList where history equals to historyId
        defaultCompanyShouldBeFound("historyId.equals=" + historyId);

        // Get all the companyList where history equals to historyId + 1
        defaultCompanyShouldNotBeFound("historyId.equals=" + (historyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultCompanyShouldBeFound(String filter) throws Exception {
        restCompanyMockMvc.perform(get("/api/companies?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(company.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyCode").value(hasItem(DEFAULT_COMPANY_CODE)))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].companyRegNumber").value(hasItem(DEFAULT_COMPANY_REG_NUMBER)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));

        // Check, that the count call also returns 1
        restCompanyMockMvc.perform(get("/api/companies/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultCompanyShouldNotBeFound(String filter) throws Exception {
        restCompanyMockMvc.perform(get("/api/companies?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCompanyMockMvc.perform(get("/api/companies/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingCompany() throws Exception {
        // Get the company
        restCompanyMockMvc.perform(get("/api/companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompany() throws Exception {
        // Initialize the database
        companyService.save(company);

        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Update the company
        Company updatedCompany = companyRepository.findById(company.getId()).get();
        // Disconnect from session so that the updates on updatedCompany are not directly saved in db
        em.detach(updatedCompany);
        updatedCompany
            .companyCode(UPDATED_COMPANY_CODE)
            .companyName(UPDATED_COMPANY_NAME)
            .companyRegNumber(UPDATED_COMPANY_REG_NUMBER)
            .rating(UPDATED_RATING);

        restCompanyMockMvc.perform(put("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompany)))
            .andExpect(status().isOk());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getCompanyCode()).isEqualTo(UPDATED_COMPANY_CODE);
        assertThat(testCompany.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testCompany.getCompanyRegNumber()).isEqualTo(UPDATED_COMPANY_REG_NUMBER);
        assertThat(testCompany.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingCompany() throws Exception {
        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Create the Company

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompanyMockMvc.perform(put("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompany() throws Exception {
        // Initialize the database
        companyService.save(company);

        int databaseSizeBeforeDelete = companyRepository.findAll().size();

        // Delete the company
        restCompanyMockMvc.perform(delete("/api/companies/{id}", company.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
