package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.OvcLinkage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LinkageRepository extends JpaRepository<OvcLinkage, UUID> {
    List<OvcLinkage> findByDatimCode(String datimCode);
    Optional<OvcLinkage> findByArtNumber(String artNumber);
    Optional<OvcLinkage> findByOvcUniqueId(String ovcUniqueId);
    List<OvcLinkage> findByHouseholdUniqueId(String householdUniqueId);
}
