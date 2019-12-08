package com.alphadevs.sales.web.rest;

import com.alphadevs.sales.WikunumV2App;
import com.alphadevs.sales.domain.ExUser;
import com.alphadevs.sales.domain.User;
import com.alphadevs.sales.domain.Company;
import com.alphadevs.sales.domain.DocumentHistory;
import com.alphadevs.sales.domain.Location;
import com.alphadevs.sales.domain.UserGroup;
import com.alphadevs.sales.repository.ExUserRepository;
import com.alphadevs.sales.service.ExUserService;
import com.alphadevs.sales.web.rest.errors.ExceptionTranslator;
import com.alphadevs.sales.service.dto.ExUserCriteria;
import com.alphadevs.sales.service.ExUserQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.alphadevs.sales.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExUserResource} REST controller.
 */
@SpringBootTest(classes = WikunumV2App.class)
public class ExUserResourceIT {

    private static final String DEFAULT_USER_KEY = "AAAAAAAAAA";
    private static final String UPDATED_USER_KEY = "BBBBBBBBBB";

    @Autowired
    private ExUserRepository exUserRepository;

    @Mock
    private ExUserRepository exUserRepositoryMock;

    @Mock
    private ExUserService exUserServiceMock;

    @Autowired
    private ExUserService exUserService;

    @Autowired
    private ExUserQueryService exUserQueryService;

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

    private MockMvc restExUserMockMvc;

    private ExUser exUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExUserResource exUserResource = new ExUserResource(exUserService, exUserQueryService);
        this.restExUserMockMvc = MockMvcBuilders.standaloneSetup(exUserResource)
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
    public static ExUser createEntity(EntityManager em) {
        ExUser exUser = new ExUser()
            .userKey(DEFAULT_USER_KEY);
        // Add required entity
        Company company;
        if (TestUtil.findAll(em, Company.class).isEmpty()) {
            company = CompanyResourceIT.createEntity(em);
            em.persist(company);
            em.flush();
        } else {
            company = TestUtil.findAll(em, Company.class).get(0);
        }
        exUser.setCompany(company);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        exUser.getLocations().add(location);
        return exUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExUser createUpdatedEntity(EntityManager em) {
        ExUser exUser = new ExUser()
            .userKey(UPDATED_USER_KEY);
        // Add required entity
        Company company;
        if (TestUtil.findAll(em, Company.class).isEmpty()) {
            company = CompanyResourceIT.createUpdatedEntity(em);
            em.persist(company);
            em.flush();
        } else {
            company = TestUtil.findAll(em, Company.class).get(0);
        }
        exUser.setCompany(company);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createUpdatedEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        exUser.getLocations().add(location);
        return exUser;
    }

    @BeforeEach
    public void initTest() {
        exUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createExUser() throws Exception {
        int databaseSizeBeforeCreate = exUserRepository.findAll().size();

        // Create the ExUser
        restExUserMockMvc.perform(post("/api/ex-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exUser)))
            .andExpect(status().isCreated());

        // Validate the ExUser in the database
        List<ExUser> exUserList = exUserRepository.findAll();
        assertThat(exUserList).hasSize(databaseSizeBeforeCreate + 1);
        ExUser testExUser = exUserList.get(exUserList.size() - 1);
        assertThat(testExUser.getUserKey()).isEqualTo(DEFAULT_USER_KEY);
    }

    @Test
    @Transactional
    public void createExUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exUserRepository.findAll().size();

        // Create the ExUser with an existing ID
        exUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExUserMockMvc.perform(post("/api/ex-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exUser)))
            .andExpect(status().isBadRequest());

        // Validate the ExUser in the database
        List<ExUser> exUserList = exUserRepository.findAll();
        assertThat(exUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUserKeyIsRequired() throws Exception {
        int databaseSizeBeforeTest = exUserRepository.findAll().size();
        // set the field null
        exUser.setUserKey(null);

        // Create the ExUser, which fails.

        restExUserMockMvc.perform(post("/api/ex-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exUser)))
            .andExpect(status().isBadRequest());

        List<ExUser> exUserList = exUserRepository.findAll();
        assertThat(exUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExUsers() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get all the exUserList
        restExUserMockMvc.perform(get("/api/ex-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].userKey").value(hasItem(DEFAULT_USER_KEY)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllExUsersWithEagerRelationshipsIsEnabled() throws Exception {
        ExUserResource exUserResource = new ExUserResource(exUserServiceMock, exUserQueryService);
        when(exUserServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restExUserMockMvc = MockMvcBuilders.standaloneSetup(exUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restExUserMockMvc.perform(get("/api/ex-users?eagerload=true"))
        .andExpect(status().isOk());

        verify(exUserServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllExUsersWithEagerRelationshipsIsNotEnabled() throws Exception {
        ExUserResource exUserResource = new ExUserResource(exUserServiceMock, exUserQueryService);
            when(exUserServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restExUserMockMvc = MockMvcBuilders.standaloneSetup(exUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restExUserMockMvc.perform(get("/api/ex-users?eagerload=true"))
        .andExpect(status().isOk());

            verify(exUserServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getExUser() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get the exUser
        restExUserMockMvc.perform(get("/api/ex-users/{id}", exUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exUser.getId().intValue()))
            .andExpect(jsonPath("$.userKey").value(DEFAULT_USER_KEY));
    }


    @Test
    @Transactional
    public void getExUsersByIdFiltering() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        Long id = exUser.getId();

        defaultExUserShouldBeFound("id.equals=" + id);
        defaultExUserShouldNotBeFound("id.notEquals=" + id);

        defaultExUserShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultExUserShouldNotBeFound("id.greaterThan=" + id);

        defaultExUserShouldBeFound("id.lessThanOrEqual=" + id);
        defaultExUserShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllExUsersByUserKeyIsEqualToSomething() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get all the exUserList where userKey equals to DEFAULT_USER_KEY
        defaultExUserShouldBeFound("userKey.equals=" + DEFAULT_USER_KEY);

        // Get all the exUserList where userKey equals to UPDATED_USER_KEY
        defaultExUserShouldNotBeFound("userKey.equals=" + UPDATED_USER_KEY);
    }

    @Test
    @Transactional
    public void getAllExUsersByUserKeyIsNotEqualToSomething() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get all the exUserList where userKey not equals to DEFAULT_USER_KEY
        defaultExUserShouldNotBeFound("userKey.notEquals=" + DEFAULT_USER_KEY);

        // Get all the exUserList where userKey not equals to UPDATED_USER_KEY
        defaultExUserShouldBeFound("userKey.notEquals=" + UPDATED_USER_KEY);
    }

    @Test
    @Transactional
    public void getAllExUsersByUserKeyIsInShouldWork() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get all the exUserList where userKey in DEFAULT_USER_KEY or UPDATED_USER_KEY
        defaultExUserShouldBeFound("userKey.in=" + DEFAULT_USER_KEY + "," + UPDATED_USER_KEY);

        // Get all the exUserList where userKey equals to UPDATED_USER_KEY
        defaultExUserShouldNotBeFound("userKey.in=" + UPDATED_USER_KEY);
    }

    @Test
    @Transactional
    public void getAllExUsersByUserKeyIsNullOrNotNull() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get all the exUserList where userKey is not null
        defaultExUserShouldBeFound("userKey.specified=true");

        // Get all the exUserList where userKey is null
        defaultExUserShouldNotBeFound("userKey.specified=false");
    }
                @Test
    @Transactional
    public void getAllExUsersByUserKeyContainsSomething() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get all the exUserList where userKey contains DEFAULT_USER_KEY
        defaultExUserShouldBeFound("userKey.contains=" + DEFAULT_USER_KEY);

        // Get all the exUserList where userKey contains UPDATED_USER_KEY
        defaultExUserShouldNotBeFound("userKey.contains=" + UPDATED_USER_KEY);
    }

    @Test
    @Transactional
    public void getAllExUsersByUserKeyNotContainsSomething() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);

        // Get all the exUserList where userKey does not contain DEFAULT_USER_KEY
        defaultExUserShouldNotBeFound("userKey.doesNotContain=" + DEFAULT_USER_KEY);

        // Get all the exUserList where userKey does not contain UPDATED_USER_KEY
        defaultExUserShouldBeFound("userKey.doesNotContain=" + UPDATED_USER_KEY);
    }


    @Test
    @Transactional
    public void getAllExUsersByRelatedUserIsEqualToSomething() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);
        User relatedUser = UserResourceIT.createEntity(em);
        em.persist(relatedUser);
        em.flush();
        exUser.setRelatedUser(relatedUser);
        exUserRepository.saveAndFlush(exUser);
        Long relatedUserId = relatedUser.getId();

        // Get all the exUserList where relatedUser equals to relatedUserId
        defaultExUserShouldBeFound("relatedUserId.equals=" + relatedUserId);

        // Get all the exUserList where relatedUser equals to relatedUserId + 1
        defaultExUserShouldNotBeFound("relatedUserId.equals=" + (relatedUserId + 1));
    }


    @Test
    @Transactional
    public void getAllExUsersByCompanyIsEqualToSomething() throws Exception {
        // Get already existing entity
        Company company = exUser.getCompany();
        exUserRepository.saveAndFlush(exUser);
        Long companyId = company.getId();

        // Get all the exUserList where company equals to companyId
        defaultExUserShouldBeFound("companyId.equals=" + companyId);

        // Get all the exUserList where company equals to companyId + 1
        defaultExUserShouldNotBeFound("companyId.equals=" + (companyId + 1));
    }


    @Test
    @Transactional
    public void getAllExUsersByHistoryIsEqualToSomething() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);
        DocumentHistory history = DocumentHistoryResourceIT.createEntity(em);
        em.persist(history);
        em.flush();
        exUser.setHistory(history);
        exUserRepository.saveAndFlush(exUser);
        Long historyId = history.getId();

        // Get all the exUserList where history equals to historyId
        defaultExUserShouldBeFound("historyId.equals=" + historyId);

        // Get all the exUserList where history equals to historyId + 1
        defaultExUserShouldNotBeFound("historyId.equals=" + (historyId + 1));
    }


    @Test
    @Transactional
    public void getAllExUsersByLocationsIsEqualToSomething() throws Exception {
        // Get already existing entity
        Location locations = exUser.getLocations();
        exUserRepository.saveAndFlush(exUser);
        Long locationsId = locations.getId();

        // Get all the exUserList where locations equals to locationsId
        defaultExUserShouldBeFound("locationsId.equals=" + locationsId);

        // Get all the exUserList where locations equals to locationsId + 1
        defaultExUserShouldNotBeFound("locationsId.equals=" + (locationsId + 1));
    }


    @Test
    @Transactional
    public void getAllExUsersByUserGroupsIsEqualToSomething() throws Exception {
        // Initialize the database
        exUserRepository.saveAndFlush(exUser);
        UserGroup userGroups = UserGroupResourceIT.createEntity(em);
        em.persist(userGroups);
        em.flush();
        exUser.addUserGroups(userGroups);
        exUserRepository.saveAndFlush(exUser);
        Long userGroupsId = userGroups.getId();

        // Get all the exUserList where userGroups equals to userGroupsId
        defaultExUserShouldBeFound("userGroupsId.equals=" + userGroupsId);

        // Get all the exUserList where userGroups equals to userGroupsId + 1
        defaultExUserShouldNotBeFound("userGroupsId.equals=" + (userGroupsId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultExUserShouldBeFound(String filter) throws Exception {
        restExUserMockMvc.perform(get("/api/ex-users?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].userKey").value(hasItem(DEFAULT_USER_KEY)));

        // Check, that the count call also returns 1
        restExUserMockMvc.perform(get("/api/ex-users/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultExUserShouldNotBeFound(String filter) throws Exception {
        restExUserMockMvc.perform(get("/api/ex-users?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restExUserMockMvc.perform(get("/api/ex-users/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingExUser() throws Exception {
        // Get the exUser
        restExUserMockMvc.perform(get("/api/ex-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExUser() throws Exception {
        // Initialize the database
        exUserService.save(exUser);

        int databaseSizeBeforeUpdate = exUserRepository.findAll().size();

        // Update the exUser
        ExUser updatedExUser = exUserRepository.findById(exUser.getId()).get();
        // Disconnect from session so that the updates on updatedExUser are not directly saved in db
        em.detach(updatedExUser);
        updatedExUser
            .userKey(UPDATED_USER_KEY);

        restExUserMockMvc.perform(put("/api/ex-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExUser)))
            .andExpect(status().isOk());

        // Validate the ExUser in the database
        List<ExUser> exUserList = exUserRepository.findAll();
        assertThat(exUserList).hasSize(databaseSizeBeforeUpdate);
        ExUser testExUser = exUserList.get(exUserList.size() - 1);
        assertThat(testExUser.getUserKey()).isEqualTo(UPDATED_USER_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingExUser() throws Exception {
        int databaseSizeBeforeUpdate = exUserRepository.findAll().size();

        // Create the ExUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExUserMockMvc.perform(put("/api/ex-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exUser)))
            .andExpect(status().isBadRequest());

        // Validate the ExUser in the database
        List<ExUser> exUserList = exUserRepository.findAll();
        assertThat(exUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExUser() throws Exception {
        // Initialize the database
        exUserService.save(exUser);

        int databaseSizeBeforeDelete = exUserRepository.findAll().size();

        // Delete the exUser
        restExUserMockMvc.perform(delete("/api/ex-users/{id}", exUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExUser> exUserList = exUserRepository.findAll();
        assertThat(exUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
