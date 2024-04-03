package org.lamisplus.modules.hiv.domain.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.lamisplus.modules.hiv.domain.dto.YesNo;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "hiv_ovc_linkage")
@SQLDelete(sql = "UPDATE public.hiv_ovc_linkage SET archived = 1, date_modified = CURRENT_TIMESTAMP WHERE id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = 0")
public class OvcLinkage extends HivAuditEntity implements Persistable<UUID> {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @Column(name = "art_number")
    private String artNumber;
    // added variables on ovc
    @Column(name = "arv_regimen")
    private String arvRegimen;
    @Column(name = "tested_date")
    private LocalDate dateTested;
    @Column(name = "art_enrollment_date")
    private LocalDate artEnrollmentDate;
    @Column(name = "vl_test_date")
    private LocalDate vlTestDate;
    @Column(name = "vl_result")
    private String vlResult;
    @Column(name = "vl_result_date")
    private LocalDate vlResultDate;

    @Column(name = "last_name")
    private String lastName;
    @Column(name = "other_name")
    private String otherName;
    private String gender;
    @Column(name = "birth_date")
    private LocalDate birthDate;
    @Column(name = "facility_state", nullable = true)
    private String facilityState;
    @Column(name = "facility_lga", nullable = true)
    private String facilityLga;
    @Column(name = "facility_uid", nullable = true)
    private String facilityUid;
    @Column(name = "facility_name")
    private String facilityName;
    @Column(name = "datim_code")
    private String datimCode;
    @Column(name = "state_of_residence")
    private String stateOfResidence;
    @Column(name = "lga_of_residence")
    private String lgaOfResidence;
    @Column(name = "entry_point")
    private String entryPoint;
    //added entities
    @Column(name = "offered_ovc_from_facility")
    private String offeredOvcFromFacility;
    @Column(name = "offer_accepted")
    private String offerAccepted;

    @Column(name = "share_contact_with_ovc")
    private YesNo shareContactWithOvc;
    @Column(name = "reason_for_decline")
    private String reasonForDecline;
    @Column(name = "drug_refill_notification")
    private YesNo drugRefillNotification;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "caregiver_surname")
    private String caregiverSurname;
    @Column(name = "caregiver_other_name")
    private String caregiverOtherName;
    @Column(name = "offer_date")
    private LocalDate offerDate;
    @Column(name = "enrollment_date")
    private LocalDate enrollmentDate;
    @Column(name = "ovc_unique_id")
    private String ovcUniqueId;
    @Column(name = "household_unique_id")
    private String householdUniqueId;
    @Column(name = "enrolled_in_ovc_program")
    private YesNo enrolledInOvcProgram;
    private int archived;
    @Column(name = "cbo_name")
    private String cboName;
    @Column(name = "facility_staff_name")
    private String facilityStaffName;
    private String status;



    @Override
    public boolean isNew() {
        return id == null;
    }
    
}

