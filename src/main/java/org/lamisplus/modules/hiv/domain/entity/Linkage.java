package org.nomisng.domain.entity;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.proxy.HibernateProxy;
import org.nomisng.domain.enumeration.YesNo;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "ovc_linkage")
@SQLDelete(sql = "UPDATE public.ovc_linkage SET archived = 1, date_modified = CURRENT_TIMESTAMP WHERE id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = 0")
public class Linkage extends Audit{
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @Column(name = "art_number")
    private String artNumber;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "other_name")
    private String otherName;
    private String gender;
    @Column(name = "birth_date")
    private LocalDate birthDate;
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

    public Linkage(String artNumber, String lastName, String otherName, String gender, LocalDate birthDate, String facilityName,
                   String datimCode, String stateOfResidence, String lgaOfResidence, String entryPoint, YesNo shareContactWithOvc,
                   String reasonForDecline, YesNo drugRefillNotification, String phoneNumber, String caregiverSurname,
                   String caregiverOtherName, LocalDate offerDate, LocalDate enrollmentDate, String ovcUniqueId, String householdUniqueId,
                   YesNo enrolledInOvcProgram, int archived, String cboName, String facilityStaffName) {
        this.artNumber = artNumber;
        this.lastName = lastName;
        this.otherName = otherName;
        this.gender = gender;
        this.birthDate = birthDate;
        this.facilityName = facilityName;
        this.datimCode = datimCode;
        this.stateOfResidence = stateOfResidence;
        this.lgaOfResidence = lgaOfResidence;
        this.entryPoint = entryPoint;
        this.shareContactWithOvc = shareContactWithOvc;
        this.reasonForDecline = reasonForDecline;
        this.drugRefillNotification = drugRefillNotification;
        this.phoneNumber = phoneNumber;
        this.caregiverSurname = caregiverSurname;
        this.caregiverOtherName = caregiverOtherName;
        this.offerDate = offerDate;
        this.enrollmentDate = enrollmentDate;
        this.ovcUniqueId = ovcUniqueId;
        this.householdUniqueId = householdUniqueId;
        this.enrolledInOvcProgram = enrolledInOvcProgram;
        this.archived = archived;
        this.cboName = cboName;
        this.facilityStaffName = facilityStaffName;
    }


    public Linkage(UUID id, String artNumber, String ovcUniqueId, String lastName, String otherName) {
        this.artNumber = artNumber;
        this.lastName = lastName;
        this.otherName = otherName;
        this.ovcUniqueId = ovcUniqueId;
        this.id = id;
    }

    public Linkage(UUID id, String artNumber, String lastName, String otherName) {
        this.artNumber = artNumber;
        this.lastName = lastName;
        this.otherName = otherName;
    }

    public Linkage(String facility, String cbo) {
        this.facilityName = facility;
        this.cboName = cbo;
    }

    @PrePersist
    public void prePersist() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Linkage linkage = (Linkage) o;
        return getId() != null && Objects.equals(getId(), linkage.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
