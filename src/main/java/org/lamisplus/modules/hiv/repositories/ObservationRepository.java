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

    @Query(nativeQuery = true, value="SELECT\n" +
            "    facility.name AS facilityName,\n" +
            "    facility_lga.name AS lga,\n" +
            "    facility_state.name AS state,\n" +
            "    h.date_confirmed_hiv AS dateConfirmed_Hiv,\n" +
            "    h.date_of_registration AS dateEnrolledInCare,\n" +
            "    CASE\n" +
            "        WHEN hac.is_commencement = true THEN hac.visit_date\n" +
            "        ELSE null\n" +
            "    END AS dateEnrolledInTreatment,\n" +
            "    CASE\n" +
            "        WHEN hac.is_commencement = true THEN hac.pregnancy_status\n" +
            "        ELSE null\n" +
            "    END AS pregnancyStatus,\n" +
            "    hr.description AS regimenAtStart,\n" +
            "    ecareEntry.display AS careEntry,\n" +
            "    hrt.description AS regimenLineAtStart,\n" +
            "    tvs.height AS latestHeight,\n" +
            "    tvs.body_weight AS latestWeight,\n" +
            "    eac.last_viral_load AS viralLoad,\n" +
            "    hac.adherence_level AS adherenceLevel,\n" +
            "    hac.who_staging_id AS currentWhoStage\n" +
            "FROM\n" +
            "    patient_person p\n" +
            "    INNER JOIN base_organisation_unit facility ON facility.id = facility_id\n" +
            "    INNER JOIN base_organisation_unit facility_lga ON facility_lga.id = facility.parent_organisation_unit_id\n" +
            "    INNER JOIN base_organisation_unit facility_state ON facility_state.id = facility_lga.parent_organisation_unit_id\n" +
            "    INNER JOIN base_organisation_unit_identifier boui ON boui.organisation_unit_id = facility_id\n" +
            "    AND boui.name = 'DATIM_ID'\n" +
            "    INNER JOIN hiv_enrollment h ON h.person_uuid = p.uuid\n" +
            "    LEFT JOIN base_application_codeset tgroup ON tgroup.id = h.target_group_id\n" +
            "    LEFT JOIN base_application_codeset eSetting ON eSetting.id = h.enrollment_setting_id\n" +
            "    LEFT JOIN base_application_codeset ecareEntry ON ecareEntry.id = h.entry_point_id\n" +
            "    LEFT JOIN hiv_art_clinical hac ON hac.hiv_enrollment_uuid = h.uuid\n" +
            "    AND hac.archived = 0\n" +
            "    AND hac.is_commencement = true\n" +
            "    LEFT JOIN hiv_regimen hr ON hr.id = hac.regimen_id\n" +
            "    LEFT JOIN hiv_regimen_type hrt ON hrt.id = hac.regimen_type_id\n" +
            "    LEFT JOIN triage_vital_sign tvs ON tvs.visit_id = hac.visit_id\n" +
            "    LEFT JOIN hiv_eac eac ON eac.person_uuid = p.uuid\n" +
            "WHERE\n" +
            "    h.archived = 0\n" +
            "    AND p.archived = 0\n" +
            "    AND h.facility_id = :facilityId\n" +
            "    AND p.uuid = :uuid\n" +
            "    AND (hac.hiv_enrollment_uuid IS NOT NULL OR tvs.visit_id IS NOT NULL OR eac.person_uuid IS NOT NULL)\n" +
            "ORDER BY\n" +
            "    hac.visit_date DESC\n" +
            "LIMIT 1;")
    Optional<PatientInfoProjection> getTransferPatientTreatmentInfo(@Param("facilityId") Long facilityId, @Param("uuid") String uuid);

    @Query(nativeQuery = true, value = "SELECT\n" +
            "  obj.value->>'name' AS regimenName,\n" +
            "  obj.value->>'dosage' AS dosage,\n" +
            "  obj.value->>'prescribed' as prescribed,\n" +
            "  obj.value->>'dispense' AS dispense,\n" +
            "  obj.value->>'duration' AS duration,\n" +
            "  obj.value->>'frequency' AS frequency \n" +
            "FROM (\n" +
            "  SELECT hap.extra->'regimens' AS regimens\n" +
            "  FROM public.hiv_art_pharmacy hap\n" +
            "  WHERE hap.person_uuid = :uuid\n" +
            "  ORDER BY hap.visit_date DESC\n" +
            ") hap\n" +
            "CROSS JOIN LATERAL jsonb_array_elements(hap.regimens) as obj;")
    List<MedicationInfo> getTransferPatientTreatmentMedication(@Param("uuid") String uuid);

    @Query(nativeQuery = true, value =
            "SELECT " +
                    "  coalesce( " +
                    "    cast(cd_4 as varchar), " +
                    "    cd4_semi_quantitative " +
                    "  ) as baseLineCD4Count " +
                    "FROM " +
                    "  public.hiv_art_clinical " +
                    "WHERE " +
                    "  is_commencement is true " +
                    "  AND archived = 0 " +
                    "  AND cd_4 != 0 " +
                    "  AND facility_id = :facilityId " +
                    "  AND public.hiv_art_clinical.person_uuid = :uuid")
    Optional<BaseLineCd4Count> getPatientBaseLineCd4Count(@Param("uuid") String uuid, @Param("facilityId") Long facilityId);

@Query(nativeQuery = true, value =
        "SELECT " +
                "    sm.result_reported AS currentCD4Count " +
                "FROM " +
                "    public.laboratory_result sm " +
                "    INNER JOIN public.laboratory_test lt ON sm.test_id = lt.id " +
                "WHERE " +
                "    lt.lab_test_id IN (1, 50) " +
                "    AND sm.date_result_reported IS NOT NULL " +
                "    AND sm.archived = 0 " +
                "    AND sm.facility_id = :facilityId " +
                "    AND sm.patient_uuid = :uuid " +
                "ORDER BY " +
                "    date_result_reported DESC " +
                "LIMIT 1")
    Optional<PatientCurrentCD4> getPatientCurrentCD4(@Param("uuid") String uuid, @Param("facilityId") Long facilityId);



   @Query(nativeQuery = true, value ="WITH transferForm AS (\n" +
           "\tSELECT\n" +
           "\t\tp.uuid as personUuid,\n" +
           "\t\tfacility.name AS facilityName,\n" +
           "\t\tfacility_lga.name AS lga,\n" +
           "\t\tfacility_state.name AS state,\n" +
           "\t\tcc.body_weight as weight,\n" +
           "\t\tcc.height as height,\n" +
           "\t\tpregstatus.pregnancy_status as pregnancyStatus,\n" +
           "\t\th.date_confirmed_hiv as dateConfirmedHiv,\n" +
           "\t\th.date_of_registration as dateEnrolledInCare,\n" +
           "\t\tadhre.adherence_level as adherenceLevel,\n" +
           "\t\tbac.display As currentWhoClinical,\n" +
           "\t\tcd4.currentCD4Count as currentCD4Count,\n" +
           "\t\tbcd4.baseLineCD4Count as baselineCD4,\n" +
           "\t\teac.last_viral_load AS viralLoad,\n" +
           "\t\tregline.currentRegimenLine as currentRegimenLine,\n" +
           "\t\tregline.firstLineArtRegimen as firstLineArtRegimen\n" +
           "\tFROM\n" +
           "\t\tpatient_person p\n" +
           "\tLEFT JOIN(\n" +
           "\t\tselect DISTINCT ON (tvs.person_uuid) tvs.person_uuid, MAX(tvs.capture_date) AS lasVital, tvs.body_weight, tvs.height, ca.commenced, ca.visit_date from triage_vital_sign tvs\n" +
           "\tINNER JOIN\n" +
           "\t(SELECT TRUE as commenced, hac.person_uuid, hac.visit_date FROM hiv_art_clinical hac WHERE hac.archived=0 AND hac.is_commencement is true\n" +
           "\tGROUP BY hac.person_uuid, hac.visit_date) ca ON ca.person_uuid = tvs.person_uuid \n" +
           "\t\tGROUP BY tvs.body_weight, tvs.height, tvs.person_uuid, ca.commenced, ca.visit_date, tvs.capture_date\n" +
           "\tORDER BY tvs.person_uuid, tvs.capture_date DESC\n" +
           "\t) cc ON cc.person_uuid = p.uuid\n" +
           "\tLEFT JOIN(\n" +
           "\tselect DISTINCT ON (hac.person_uuid) hac.person_uuid, MAX(hac.visit_date) as lastVisit , hac.adherence_level, hac.clinical_stage_id from hiv_art_clinical as hac \n" +
           "\tgroup by hac.person_uuid, hac.visit_date, hac.adherence_level, hac.clinical_stage_id) adhre ON adhre.person_uuid = p.uuid\n" +
           "\tLEFT JOIN(\n" +
           "select DISTINCT ON (hac.person_uuid) hac.person_uuid, MAX(hac.visit_date) as lastVisit , hac.pregnancy_status from hiv_art_clinical as hac \n" +
           "\tgroup by hac.person_uuid, hac.visit_date, hac.pregnancy_status) pregstatus ON pregstatus.person_uuid = p.uuid\t\n" +
           "\tLEFT JOIN (\n" +
           "\t\tselect DISTINCT ON (hac.person_uuid) hac.person_uuid, MAX(hac.visit_date) as lastVisit , hac.regimen_id, hac.regimen_type_id,  \n" +
           "\t\thr.description as currentRegimenLine, hrt.description as firstLineArtRegimen from hiv_art_clinical as hac \n" +
           "\t\t LEFT JOIN hiv_regimen hr ON hr.id = hac.regimen_id\n" +
           "\t\tLEFT JOIN hiv_regimen_type hrt ON hrt.id = hac.regimen_type_id \n" +
           "\t\tgroup by hac.person_uuid, hac.visit_date, hac.regimen_id, hac.regimen_type_id, hac.regimen_id, hac.regimen_type_id, hrt.description, hr.description\n" +
           "\t) regline ON regline.person_uuid = p.uuid\n" +
           "\tINNER JOIN base_organisation_unit facility ON facility.id = facility_id\n" +
           "\t INNER JOIN base_organisation_unit facility_lga ON facility_lga.id = facility.parent_organisation_unit_id\n" +
           "\t INNER JOIN base_organisation_unit facility_state ON facility_state.id = facility_lga.parent_organisation_unit_id\n" +
           "\t LEFT JOIN base_application_codeset bac ON bac.id = adhre.clinical_stage_id\n" +
           "\t LEFT JOIN hiv_eac eac ON eac.person_uuid = p.uuid\n" +
           "\tLEFT JOIN\n" +
           "\t\t(SELECT DISTINCT ON (sm.patient_uuid)\n" +
           "\t\t sm.patient_uuid,\n" +
           "\t\tsm.result_reported AS currentCD4Count,\n" +
           "\t\tsm.date_result_reported\n" +
           "\tFROM\n" +
           "\t\tpublic.laboratory_result sm\n" +
           "\t\tINNER JOIN public.laboratory_test lt ON sm.test_id = lt.id\n" +
           "\tWHERE\n" +
           "\t\tlt.lab_test_id IN (1, 50)\n" +
           "\t\tAND sm.date_result_reported IS NOT NULL\n" +
           "\t\tAND sm.archived = 0\n" +
           "\tORDER BY\n" +
           "\t\t sm.patient_uuid,\n" +
           "\t\tsm.date_result_reported DESC \n" +
           "\t\t) cd4 ON cd4.patient_uuid = p.uuid\n" +
           "\n" +
           "\tleft join(\n" +
           "\t\tSELECT\n" +
           "\t\tCOALESCE(\n" +
           "\t\t\tCAST(cd_4 AS VARCHAR),\n" +
           "\t\t\tcd4_semi_quantitative\n" +
           "\t\t) AS baseLineCD4Count, person_uuid\n" +
           "\tFROM\n" +
           "\t\tpublic.hiv_art_clinical\n" +
           "\tWHERE\n" +
           "\t\tis_commencement IS TRUE\n" +
           "\t\tAND archived = 0\n" +
           "\t\tAND cd_4 != 0\n" +

           "\t) bcd4\ton bcd4.person_uuid = p.uuid\t\n" +
           "\t left JOIN hiv_enrollment h ON h.person_uuid = p.uuid\n" +
           "\t) \n" +
           "\tselect personUuid, (select min(visit_date) from hiv_art_clinical where person_uuid = personUuid) as dateEnrolledInTreatment, facilityName, lga, state, weight, height, pregnancyStatus, dateEnrolledIncare, dateConfirmedHiv,\n" +
           "\tadherenceLevel, currentWhoClinical, currentCD4Count, baselineCD4, viralLoad, currentRegimenLine , firstLineArtRegimen\n" +
           "\tfrom transferForm where personUuid = :uuid\n" +
           "\n")
    Optional<TransferPatientInfo> getTransferPatientInfo(@Param("uuid") String uuid);
}