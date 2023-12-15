package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.dto.LinkageResponseInterface;
import org.lamisplus.modules.hiv.domain.entity.OvcLinkage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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


    @Query(value = "SELECT\n" +
            "    e.unique_id AS artNumber,\n" +
            "    e.date_of_registration AS offerDate,\n" +
            "    l.last_name AS lastName,\n" +
            "    l.other_name AS otherName,\n" +
            "    l.gender,\n" +
            "    (p.contact_point->'contactPoint'->1->>'value') AS phoneNumber,\n" +
            "    f.name AS facilityName,\n" +
            "    l.state_of_residence AS stateOfResidence,\n" +
            "    l.lga_of_residence AS lgaOfResidence,\n" +
            "    l.entry_point AS entryPoint,\n" +
            "    l.share_contact_with_ovc AS shareContactWithOvc,\n" +
            "    l.reason_for_decline AS reasonForDecline,\n" +
            "    l.drug_refill_notification AS drugRefillNotification,\n" +
            "    l.caregiver_surname AS caregiverSurname,\n" +
            "    l.caregiver_other_name AS caregiverOtherName,\n" +
            "    l.enrollment_date AS enrollmentDate,\n" +
            "    l.ovc_unique_id AS ovcUniqueId,\n" +
            "    p.date_of_birth AS birthDate,\n" +
            "    boui.code AS datimCode,\n" +
            "    l.cbo_name AS cboName,\n" +
            "    l.facility_staff_name AS facilityStaffName,\n" +
            "    l.household_unique_id AS householdUniqueId,\n" +
            "    l.enrolled_in_ovc_program AS enrolledInOvcProgram,\n" +
            "    e.archived\n" +
            "FROM\n" +
            "    patient_person AS p\n" +
            "INNER JOIN base_organisation_unit f ON f.id = p.facility_id \n" +
            "INNER JOIN base_organisation_unit_identifier boui ON boui.organisation_unit_id = p.facility_id\n" +
            "AND boui.name = 'DATIM_ID'\t\n" +
            "JOIN hiv_enrollment AS e ON e.person_uuid = p.uuid\n" +
            "JOIN hiv_ovc_linkage AS l ON l.ovc_unique_id = e.ovc_number;", nativeQuery = true)
    List<LinkageResponseInterface> findAllEnrolledOvcClients();
}
