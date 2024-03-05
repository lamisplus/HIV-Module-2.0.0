package org.lamisplus.modules.hiv.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkageResponse {
    private UUID id;
    private String artNumber;
    // added variables on ovc
    private String arvRegimen;
    private LocalDate dateTested;
    private LocalDate artEnrollmentDate;
    private LocalDate vlTestDate;
    private String vlResult;
    private LocalDate vlResultDate;

    private String lastName;
    private String otherName;
    private String gender;
    private String birthDate;
    private String facilityName;
    private String datimCode;
    private String stateOfResidence;
    private String lgaOfResidence;
    private String entryPoint;
    //recent added entities
    private String offeredOvcFromFacility;
    private String offerAccepted;

    private YesNo shareContactWithOvc;
    private String reasonForDecline;
    private YesNo drugRefillNotification;
    private String phoneNumber;
    private String caregiverSurname;
    private String caregiverOtherName;
    private String offerDate;
    private String enrollmentDate;
    private String ovcUniqueId;
    private String householdUniqueId;
    private YesNo enrolledInOvcProgram;
    private int archived;
    private String cboName;
    private String facilityStaffName;
    private Instant dateCreated;
    private Instant dateModified;


    public LinkageResponse(UUID id, String artNumber, String ovcUniqueId, String lastName, String otherName) {
        this.artNumber = artNumber;
        this.lastName = lastName;
        this.otherName = otherName;
        this.ovcUniqueId = ovcUniqueId;
        this.id = id;
    }


}
