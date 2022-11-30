package com.alphadevs.sales.repository;
import com.alphadevs.sales.domain.ExUser;
import com.alphadevs.sales.domain.Location;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Location entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocationRepository extends JpaRepository<Location, Long>, JpaSpecificationExecutor<Location> {
    List<Location> findAllByUsers(ExUser user);
}
