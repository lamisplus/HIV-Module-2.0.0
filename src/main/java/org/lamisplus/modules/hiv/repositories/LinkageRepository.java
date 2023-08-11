package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.Linkage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LinkageRepository extends JpaRepository<Linkage, UUID> {
    List<Linkage> findByDatimCode(String datimCode);
    Optional<Linkage> findByArtNumber(String artNumber);
    Optional<Linkage> findByOvcUniqueId(String ovcUniqueId);
    List<Linkage> findByHouseholdUniqueId(String householdUniqueId);
}
