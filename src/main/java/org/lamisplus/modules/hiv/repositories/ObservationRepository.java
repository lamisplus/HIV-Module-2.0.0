package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.HIVStatusTracker;
import org.lamisplus.modules.hiv.domain.entity.Observation;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ObservationRepository extends JpaRepository<Observation, Long> {
    Optional<Observation> getAllByTypeAndPersonAndFacilityIdAndArchived(String type, Person person, Long facilityId, Integer archived);
    List<Observation> getAllByPersonAndFacilityId(Person person, Long facilityId);
    List<Observation> getAllByPersonAndArchived(Person person, Integer archived);
    @Query(value = "SELECT * from hiv_observation where (type = 'Clinical evaluation' \n" +
            "            OR type = 'Mental health' )\n" +
            "            AND person_uuid = ?1  AND archived = 0", nativeQuery = true)
    List<Observation> getClinicalEvaluationAndMentalHealth(String personUuid);


    //For central sync
    List<Observation> findAllByFacilityId(Long facilityId);

    @Query(value = "SELECT * FROM hiv_observation WHERE last_modified_date > ?1 AND facility_id=?2",
            nativeQuery = true
    )
    List<Observation> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);

    Optional<Observation> findByUuid(String uuid);

}
