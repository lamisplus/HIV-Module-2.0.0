package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.dto.*;
import org.lamisplus.modules.hiv.domain.entity.Observation;
import org.lamisplus.modules.hiv.domain.entity.PatientInfoProjection;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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
    Optional<String> getIPTEligiblePatientUuid(Long facilityId, String uuid);

    List<Observation> getAllByPersonAndFacilityId(Person person, Long orgId);

    @Query(nativeQuery = true, value =
            "SELECT " +
                    "    a.facility_id AS facilityId, " +
                    "    (SELECT x.name FROM base_organisation_unit x WHERE x.id = a.facility_id LIMIT 1) AS facility, " +
                    "    a.patient_uuid AS patientId, " +
                    "    (SELECT x.hospital_number FROM patient_person x WHERE x.uuid = a.patient_uuid LIMIT 1) AS hospitalNum, " +
                    "    c.lab_test_name AS test, " +
                    "    d.date_sample_collected AS sampleCollectionDate, " +
                    "    oi.code AS datimId, " +
                    "    b.result_reported AS result, " +
                    "    b.date_result_reported AS dateReported " +
                    "FROM " +
                    "    laboratory_test a " +
                    "    INNER JOIN laboratory_result b ON a.id = b.test_id " +
                    "    INNER JOIN laboratory_labtest c ON a.lab_test_id = c.id " +
                    "    INNER JOIN base_organisation_unit_identifier oi ON oi.organisation_unit_id = a.facility_id " +
                    "    INNER JOIN laboratory_sample d ON a.id = d.test_id " +
                    "WHERE " +
                    "    c.lab_test_name = 'Viral Load' " +
                    "    AND b.result_reported != '' " +
                    "    AND a.facility_id = ?1 " +
                    "    AND a.patient_uuid = ?2")
    List<LabReport> getPatientLabResults(@Param("facilityId") Long facilityId, @Param("patientUuid") String patientUuid);

    @Query(nativeQuery = true, value =
            "SELECT \n" +
                    "    facility.name AS facilityName, \n" +
                    "    facility_lga.name AS lga, \n" +
                    "    facility_state.name AS state,\n" +
                    "    h.date_confirmed_hiv AS dateConfirmed_Hiv,\n" +
                    "    h.date_of_registration AS dateEnrolledInCare,\n" +
                    "    CASE \n" +
                    "        WHEN hac.is_commencement = true THEN hac.visit_date \n" +
                    "        ELSE null\n" +
                    "    END AS dateEnrolledInTreatment,\n" +
                    "    boui.code AS datimId,   \n" +
                    "    hr.description AS regimenAtStart, \n" +
                    "    h.date_of_registration AS dateOfEnrollment, \n" +
                    "    ecareEntry.display AS careEntry, \n" +
                    "    hrt.description AS regimenLineAtStart,\n" +
                    "    (\n" +
                    "        SELECT \n" +
                    "            COALESCE(\n" +
                    "                CAST(cd_4 AS VARCHAR), \n" +
                    "                cd4_semi_quantitative\n" +
                    "            ) AS baseLineCD4Count\n" +
                    "        FROM \n" +
                    "            public.hiv_art_clinical \n" +
                    "        WHERE \n" +
                    "            is_commencement IS true \n" +
                    "            AND archived = 0 \n" +
                    "            AND cd_4 != 0 \n" +
                    "            AND facility_id = ?1\n" +
                    "            AND public.hiv_art_clinical.person_uuid = p.uuid\n" +
                    "        LIMIT 1\n" +
                    "    ) AS baselineCD4Count,\n" +
                    "    tvs.height AS latestHeight,\n" +
                    "    tvs.body_weight AS latestWeight,\n" +
                    "    hac.adherence_level as adherenceLevel,\n" +
                    "\the.last_viral_load as viralLoad\n" +
                    "FROM \n" +
                    "    patient_person p \n" +
                    "    INNER JOIN base_organisation_unit facility ON facility.id = facility_id \n" +
                    "    INNER JOIN base_organisation_unit facility_lga ON facility_lga.id = facility.parent_organisation_unit_id \n" +
                    "    INNER JOIN base_organisation_unit facility_state ON facility_state.id = facility_lga.parent_organisation_unit_id \n" +
                    "    INNER JOIN base_organisation_unit_identifier boui ON boui.organisation_unit_id = facility_id \n" +
                    "    AND boui.name = 'DATIM_ID' \n" +
                    "    INNER JOIN hiv_enrollment h ON h.person_uuid = p.uuid \n" +
                    "    LEFT JOIN base_application_codeset tgroup ON tgroup.id = h.target_group_id \n" +
                    "    LEFT JOIN base_application_codeset eSetting ON eSetting.id = h.enrollment_setting_id \n" +
                    "    LEFT JOIN base_application_codeset ecareEntry ON ecareEntry.id = h.entry_point_id \n" +
                    "    INNER JOIN hiv_art_clinical hac ON hac.hiv_enrollment_uuid = h.uuid\n" +
                    "\tINNER JOIN hiv_eac he on he.person_uuid = h.person_uuid \n" +
                    "    AND hac.archived = 0 \n" +
                    "    INNER JOIN hiv_regimen hr ON hr.id = hac.regimen_id \n" +
                    "    INNER JOIN hiv_regimen_type hrt ON hrt.id = hac.regimen_type_id \n" +
                    "    LEFT JOIN triage_vital_sign tvs ON tvs.visit_id = hac.visit_id\n" +
                    "WHERE \n" +
                    "    h.archived = 0 \n" +
                    "    AND p.archived = 0 \n" +
                    "    AND h.facility_id = ?1\n" +
                    "    AND hac.is_commencement = TRUE \n" +
                    "    AND p.uuid = ?2\n" +
                    "ORDER BY \n" +
                    "    hac.visit_date DESC\n" +
                    "LIMIT 1;\n")
    Optional<PatientInfoProjection> getTransferPatientTreatmentInfo(@Param("facilityId") Long facilityId, @Param("uuid") String uuid);
    @Query(nativeQuery =true, value="SELECT\n" +
            "  obj.value->>'name' AS regimenName,\n" +
            "  obj.value->>'dosage' AS dosage,\n" +
            "  obj.value->>'prescribed' as prescribed,\n" +
            "  obj.value->>'dispense' AS dispense,\n" +
            "  obj.value->>'duration' AS duration,\n" +
            "  obj.value->>'freqency' AS freqency \n" +
            "FROM (\n" +
            "  SELECT hap.extra->'regimens' AS regimens\n" +
            "  FROM public.hiv_art_pharmacy hap\n" +
            "  WHERE hap.person_uuid = :uuid\n" +
            "  ORDER BY hap.visit_date DESC\n" +
            ") hap\n" +
            "CROSS JOIN LATERAL jsonb_array_elements(hap.regimens) as obj;" )
   List<MedicationInfo> getTransferPatientTreatmentMedication(@Param("uuid") String uuid);
}
