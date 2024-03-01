package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.dto.CurrentViralLoadDTO;
import org.lamisplus.modules.hiv.domain.entity.CurrentViralLoad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CurrentViralLoadRepository extends JpaRepository<CurrentViralLoad, Long> {
    @Query(value = "SELECT lr.id, lr.result_reported, lr.date_result_reported FROM laboratory_result lr INNER JOIN laboratory_test lt ON lr.test_id = lt.id WHERE lr.patient_id = ?1 AND lr.date_result_reported IS NOT NULL and lr.archived = 0 ORDER BY lr.date_result_reported DESC LIMIT 1", nativeQuery = true)
    Optional<CurrentViralLoad> findViralLoadByPersonId(Long personId);
}
