package com.alphadevs.sales.repository;
import com.alphadevs.sales.domain.Items;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Items entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemsRepository extends JpaRepository<Items, Long>, JpaSpecificationExecutor<Items> {

}
