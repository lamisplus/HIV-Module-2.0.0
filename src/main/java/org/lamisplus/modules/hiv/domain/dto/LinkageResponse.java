package org.lamisplus.modules.hiv.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.YesNo;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkageResponse {
    private UUID id;
    private String artNumber;
    private String lastName;
    private String otherName;
    private String gender;
    private LocalDate birthDate;
    private String facilityName;
    private String datimCode;
    private String stateOfResidence;
    private String lgaOfResidence;
    private String entryPoint;
    private YesNo shareContactWithOvc;
    private String reasonForDecline;
    private YesNo drugRefillNotification;
    private String phoneNumber;
    private String caregiverSurname;
    private String caregiverOtherName;
    private LocalDate offerDate;
    private LocalDate enrollmentDate;
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
