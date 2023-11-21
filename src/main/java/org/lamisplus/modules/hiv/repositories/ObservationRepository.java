package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.Observation;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ObservationRepository extends JpaRepository<Observation, Long> {
    List<Observation> getAllByTypeAndPersonAndFacilityIdAndArchived(String type, Person person, Long facilityId, Integer archived);
    List<Observation> getAllByPersonAndFacilityIdAndArchived(Person person, Long facilityId, Integer archived);
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
    
    @Query(value = "SELECT tbTreatmentPersonUuid FROM (SELECT \n" +
            "COALESCE(NULLIF(CAST(data->'tbIptScreening'->>'eligibleForTPT' AS text), ''), '') as eligibleForTPT,\n" +
            "person_uuid as tbTreatmentPersonUuid,\n" +
            "ROW_NUMBER() OVER ( PARTITION BY person_uuid ORDER BY date_of_observation DESC)\n" +
            "FROM hiv_observation WHERE type = 'Chronic Care'   \n" +
            "\t\t\t   AND facility_id = ?1 \n" +
            ") tbTreatment WHERE row_number = 1 AND  eligibleForTPT IS NOT NULL \n" +
            "AND eligibleForTPT = 'Yes'\n" +
            "AND tbTreatmentPersonUuid = ?2", nativeQuery = true)
    Optional<String>  getIPTEligiblePatientUuid(Long facilityId, String uuid);

}
