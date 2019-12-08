package com.alphadevs.sales.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * UserPermissions Entity.\n@author Mihindu Karunarathne.
 */
@ApiModel(description = "UserPermissions Entity.\n@author Mihindu Karunarathne.")
@Entity
@Table(name = "user_permissions")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserPermissions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_perm_key")
    private String userPermKey;

    @Column(name = "user_perm_description")
    private String userPermDescription;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private ExUser user;

    @OneToMany(mappedBy = "userPermission")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MenuItems> menuItems = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("userPermissions")
    private DocumentHistory history;

    @ManyToOne
    @JsonIgnoreProperties("userPermissions")
    private UserGroup userGroup;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserPermKey() {
        return userPermKey;
    }

    public UserPermissions userPermKey(String userPermKey) {
        this.userPermKey = userPermKey;
        return this;
    }

    public void setUserPermKey(String userPermKey) {
        this.userPermKey = userPermKey;
    }

    public String getUserPermDescription() {
        return userPermDescription;
    }

    public UserPermissions userPermDescription(String userPermDescription) {
        this.userPermDescription = userPermDescription;
        return this;
    }

    public void setUserPermDescription(String userPermDescription) {
        this.userPermDescription = userPermDescription;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public UserPermissions isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public ExUser getUser() {
        return user;
    }

    public UserPermissions user(ExUser exUser) {
        this.user = exUser;
        return this;
    }

    public void setUser(ExUser exUser) {
        this.user = exUser;
    }

    public Set<MenuItems> getMenuItems() {
        return menuItems;
    }

    public UserPermissions menuItems(Set<MenuItems> menuItems) {
        this.menuItems = menuItems;
        return this;
    }

    public UserPermissions addMenuItems(MenuItems menuItems) {
        this.menuItems.add(menuItems);
        menuItems.setUserPermission(this);
        return this;
    }

    public UserPermissions removeMenuItems(MenuItems menuItems) {
        this.menuItems.remove(menuItems);
        menuItems.setUserPermission(null);
        return this;
    }

    public void setMenuItems(Set<MenuItems> menuItems) {
        this.menuItems = menuItems;
    }

    public DocumentHistory getHistory() {
        return history;
    }

    public UserPermissions history(DocumentHistory documentHistory) {
        this.history = documentHistory;
        return this;
    }

    public void setHistory(DocumentHistory documentHistory) {
        this.history = documentHistory;
    }

    public UserGroup getUserGroup() {
        return userGroup;
    }

    public UserPermissions userGroup(UserGroup userGroup) {
        this.userGroup = userGroup;
        return this;
    }

    public void setUserGroup(UserGroup userGroup) {
        this.userGroup = userGroup;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserPermissions)) {
            return false;
        }
        return id != null && id.equals(((UserPermissions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserPermissions{" +
            "id=" + getId() +
            ", userPermKey='" + getUserPermKey() + "'" +
            ", userPermDescription='" + getUserPermDescription() + "'" +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
