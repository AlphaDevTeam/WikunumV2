package com.alphadevs.sales.repository;
import com.alphadevs.sales.domain.UOM;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UOM entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UOMRepository extends JpaRepository<UOM, Long>, JpaSpecificationExecutor<UOM> {

}
