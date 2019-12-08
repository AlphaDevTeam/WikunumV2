package com.alphadevs.sales.repository;
import com.alphadevs.sales.domain.UserGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long>, JpaSpecificationExecutor<UserGroup> {

}
