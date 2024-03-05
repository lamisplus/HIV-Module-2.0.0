package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;

public interface LinkageResponseInterface {

    String getArtNumber();

    //added entity
    String getArvRegimen();

    String getDateTested();

    String getArtEnrollmentDate();

    String getVlTestDate();

    String getVlResult();

    String getVlResultDate();

    String getLastName();

    String getOtherName();

    String getGender();

    String getBirthDate();

    String getFacilityName();

    String getDatimCode();

    String getStateOfResidence();

    String getLgaOfResidence();

    String getEntryPoint();

    //reent
    String getOfferedOvcFromFacility();

    String getOfferAccepted();

    YesNo getShareContactWithOvc();

    String getReasonForDecline();

    YesNo getDrugRefillNotification();

    String getPhoneNumber();

    String getCaregiverSurname();

    String getCaregiverOtherName();

    String getOfferDate();

    String getEnrollmentDate();

    String getOvcUniqueId();

    String getHouseholdUniqueId();

    YesNo getEnrolledInOvcProgram();

    int getArchived();

    String getCboName();

    String getFacilityStaffName();


}

